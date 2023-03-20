from tkinter import *

ventana = Tk()
ventana.title('Calculadora')
ventana.geometry('800x400')

etiqueta = Label(ventana, text="Warface")
etiqueta.grid(column=0, row=0)


def jugar():
    etiqueta.configure(text='codigo al hacer click')


boton = Button(ventana, text="CLick", command=jugar)
boton.grid(column=0, row=1)

ventana.mainloop()
