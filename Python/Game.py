import pygame
import time
import View, Model, Controller

from View import *
from Model import *
from Controller import *

from pygame.locals import *
from time import sleep

class Game():
    def __init__(self):  
        print ('Game Constructor')

    print("Use the arrow keys to move. Press Esc to quit.")
    pygame.init()
    m = Model()
    v = View(m)
    c = Controller(m)
    while c.keep_going:
        c.update()
        m.update()
        v.update()
        sleep(0.04)
    print("Goodbye")
        