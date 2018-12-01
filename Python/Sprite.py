class Sprite(object):
    x = None
    y = None
    w = None
    h = None
    isMario = None
    isCoin = None
    isCoinBlock = None
    isGoomba = None
    
    def __init__(self,x,y,w,h):
        self.x = x
        self.y = y
        self.w = w
        self.h = h
        self.isMario = False
        self.isBrick = False
        self.isCoin = False
        self.isCoinBlock = False
        self.isGoomba = False

    def update(self):
        print('Sprite update method')

    def draw(self):
        print('Sprite draw Method')

    
