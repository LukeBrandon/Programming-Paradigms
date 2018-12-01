class Sprite(object):
    x = None
    y = None
    w = None
    h = None
    prevX = None
    prevY = None
    isMario = None
    isCoin = None
    isCoinBlock = None
    isGoomba = None
    
    def __init__(self,x,y,w,h):
        self.x = x
        self.y = y
        self.w = w
        self.h = h
        self.prevX = 0
        self.prevY = 0
        self.isMario = False
        self.isBrick = False
        self.isCoin = False
        self.isCoinBlock = False
        self.isGoomba = False

    def update(self):
        print('Sprite update method')

    def draw(self):
        print('Sprite draw Method')

    def collides(self, that):
        if(self.y + self.h <= that.y):     #above
            return False
        elif(self.x + self.w <= that.x):     #right side of mario 
            return False
        elif(self.x >= that.x + that.w):      #left side of mario
            return False
        elif(self.y >= that.y + that.h):      #below
            return False
        else:
            return True

    def pushOut(self, that):
        #entering from top
        if(self.y + self.h >= that.y and not(self.prevY + self.h > that.y)):  
            self.y = that.y - self.h
            self.lastTouchCounter = 0
            self.vertVel = 0.0
            return "top"

        #entering from bottom
        elif(self.y <= that.y + that.h and not(self.prevY < that.y + that.h)):  
            self.y = that.y + that.h
            self.lastTouchCounter = 100 #so mario cant keep jumping 
            self.vertVel = 0.2
            return "bottom"

        #entering from left
        elif(self.x + self.w >= that.x and not(self.prevX + self.w > that.x) ):
            self.x = that.x  - self.w  
            return "left"

        #entering from right
        elif(self.x <= (that.x + that.w) and not(self.prevX < (that.x + that.w) )): 
            self.x = that.x + that.w
            return "right"

        else:
            return "not"


    
