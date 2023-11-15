import { OpenAI } from 'openai';
import { getAIEnvVariables } from '../../config';
import { log } from 'console';
import fetch from 'node-fetch'
import { WebSocketServer, WebSocket } from 'ws';
import { safeParse } from '../../utils/inedx';

export interface IAIClientOptions {
  external?: boolean;
  ws?: boolean;
}

export default class AIClient {
  private model: OpenAI;
  private options: IAIClientOptions;
  public wss: WebSocketServer;
  public ws: WebSocket | undefined;

  constructor(options: IAIClientOptions) {
    const { proxy, proxyAPIKey } = getAIEnvVariables();
    console.log(proxyAPIKey);
    const openai = new OpenAI({
      baseURL: proxy,
      apiKey: proxyAPIKey ?? ''
    });

    this.model = openai;
    this.options = options;

    this.wss = this.createSocketServer();
  }

  public createSocketServer() {
    const wss = new WebSocketServer({
      port: 8080,
      perMessageDeflate: {
        zlibDeflateOptions: {
          // See zlib defaults.
          chunkSize: 1024,
          memLevel: 7,
          level: 3
        },
        zlibInflateOptions: {
          chunkSize: 10 * 1024
        },
        // Other options settable:
        clientNoContextTakeover: true, // Defaults to negotiated value.
        serverNoContextTakeover: true, // Defaults to negotiated value.
        serverMaxWindowBits: 10, // Defaults to negotiated value.
        // Below options specified as default values.
        concurrencyLimit: 10, // Limits zlib concurrency for perf.
        threshold: 1024 // Size (in bytes) below which messages
        // should not be compressed if context takeover is disabled.
      }
    })

    return wss;
  }

  public async callModel(prompt: string) {
    if (this.options.external) {
      this.wss.on('connection', (socket) => {
        console.log('Client connected');
        socket.send(JSON.stringify({ prompt }));

        socket.on('message', (message) => {
          const feedbacks = safeParse(message.toString());
          console.log('feedbacks => ', feedbacks);
        });
        socket.on('close', () => {
          console.log('Client disconnected');
        });
      });
    } else {
      const chatCompletion = await this.model.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-3.5-turbo',
      });
  
      log('[chatCompletion =>]', chatCompletion);
    }
  }

  public async callModelWithFeedback() {}
}
