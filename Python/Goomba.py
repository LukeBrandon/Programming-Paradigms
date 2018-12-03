
from Sprite import *

class Goomba(Sprite):
    def __init__(self):  
        print('goomba constructor')
        isGoomba = True

    def update(self):
        print ('goomba update')

    def draw(self, scree):
        print('goomba draw')