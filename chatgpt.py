import openai

openai.api_key = "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"

while True: 
    prompt = input("You: ")

    if prompt == "exit":
        break
    completion = openai.Completion.create(engine="text-davinci-003", 
                         prompt=prompt,
                         max_tokens=2048)
    print("ChatGPT: " + completion.choices[0].text)

 
print(completion.choices[0].text)
