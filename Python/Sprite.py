class Sprite(object):
    x = None
    y = None
    w = None
    h = None
    isMario = None
    isCoin = None
    isCoinBlock = None
    isGoomba = None

    def __init__(self):  
        print ('Sprite constructor')
        self.x = 0
        self.y = 0
        self.w = 0
        self.h = 0
        self.isMario = False
        self.isCoin = False
        self.isCoinBlock = False
        self.isGoomba = False

    def update(self):
        print('Sprite update method')

    def draw(self):
        print('Sprite draw Method')

    
