from Coin import *
from CoinBlock import *
from Goomba import *
from Sprite import *

class Mario(Sprite):
    def __init__(self, _model):  
        print ('Mario constructor')
        self.model = _model
        isMario = True


    def update(self):
        print ('Mario update method')
        for x in self.model.sprites:
            print('for looping')


    def draw(self):
        print ('Mario draw method')
