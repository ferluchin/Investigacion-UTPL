# Import the required modules
import tkinter as tk
import openai

# Set the OpenAI API key
import os
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

# Define the main application class


class App(tk.Frame):
    def __init__(self, master=None):
        super().__init__(master)
        self.master = master
        self.pack()
        self.create_widgets()

    # Define the widgets for the GUI
    def create_widgets(self):
        self.prompt_label = tk.Label(self, text="You:")
        self.prompt_label.pack(side="top")

        self.prompt_entry = tk.Entry(self)
        self.prompt_entry.pack(side="top")

        self.send_button = tk.Button(
            self, text="Send", command=self.send_prompt)
        self.send_button.pack()

        self.chat_log = tk.Text(self)
        self.chat_log.pack()

    # Define the function for sending prompts to OpenAI and displaying the response
    def send_prompt(self):
        prompt = self.prompt_entry.get()

        if prompt == "exit":
            self.master.destroy()

        completion = openai.Completion.create(engine="text-davinci-003",
                                              prompt=prompt,
                                              max_tokens=4000)

        response = "ChatGPT: " + completion.choices[0].text
        self.chat_log.insert(tk.END, response + "\n")


# Create an instance of the main application class and run the GUI
root = tk.Tk()
app = App(master=root)
app.mainloop()
