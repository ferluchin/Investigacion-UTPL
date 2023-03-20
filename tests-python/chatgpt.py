import openai

import os
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

while True:
    prompt = input("You: ")

    if prompt == "exit":
        break
    completion = openai.Completion.create(engine="text-davinci-003",
                                          prompt=prompt,
                                          max_tokens=4000)
    print("ChatGPT: " + completion.choices[0].text)


print(completion.choices[0].text)
