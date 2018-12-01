
from Sprite import *

class CoinBlock(Sprite):

    def __init__(self, model, x, y, w, h):
        super(CoinBlock, self).__init__(x,y,w,h)  
        isCoinBlock = True

