import json

from Mario import *
from json import *


class Model():
    sprites = []
    mario = None
    rect = None

    def __init__(self):
        self.dest_x = 0
        self.dest_y = 0
        self.mario = Mario(self)
        self.sprites = []
        self.sprites.append(self.mario)
        # unmarshall()

    def update(self):
        if self.rect.left < self.dest_x:
            self.rect.left += 1
        if self.rect.left > self.dest_x:
            self.rect.left -= 1
        if self.rect.top < self.dest_y:
            self.rect.top += 1
        if self.rect.top > self.dest_y:
            self.rect.top -= 1

    def set_dest(self, pos):
        self.dest_x = pos[0]
        self.dest_y = pos[1]

    def unmarshall(self):
        print('marshalling map.json')
        with open('map.json') as map_file:
            data = json.load(map_file)
        # print(data)

        for i in data["sprites"]:
            print(data["sprites"].get(i))
            self.sprites.insert(data["sprites"].get(i))
