from CoinBlock import *
from Sprite import *

class Coin(Sprite):
    def __init__(self):  
        print ('coin constructor')
        isCoin = True

    def update(self):
        print ('Coin update')

    def draw(self):
        print ('coin draw method')
