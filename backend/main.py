import os
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage
from azure.core.credentials import AzureKeyCredential
from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
CORS(app,
     origins='https://super-computing-machine-p6grp74g59jf97qx-3000.app.github.dev',
     supports_credentials=True
     )


@app.route('/')
def backend_check():
    return "Backend works"

@app.route('/query/<search_stream>')
def search(search_stream):
    output={'client':False,'message':"hello how can i help you"}
    # print(output)
    # return output
    endpoint = "https://models.github.ai/inference"
    model = "openai/gpt-4.1"
    token = os.environ["GITHUB_TOKEN"]

    client = ChatCompletionsClient(
        endpoint=endpoint,
        credential=AzureKeyCredential(token),
    )

    response = client.complete(
        messages=[
            SystemMessage("You are a helpful assistant."),
            UserMessage(search_stream),
        ],
        temperature=1.0,
        top_p=1.0,
        model=model
    )
    output={'client':False,'message':response.choices[0].message.content}
    print(output)
    
    return output

if __name__ == "__main__":
    app.run()