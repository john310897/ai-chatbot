import os
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage
from azure.core.credentials import AzureKeyCredential
from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
CORS(app,
     origins='https://john310897.github.io',
     supports_credentials=True
     )


@app.route('/')
def backend_check():
    print("Backend works...")
    return "Backend works"

@app.route('/query/<search_stream>')
def search(search_stream):
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
    return output

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=5000,debug=True)