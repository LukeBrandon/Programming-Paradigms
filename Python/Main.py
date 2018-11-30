import pygame

windowWidth = 200
windowHeight = 300
pygame.init()
surface = pygame.display.set_mode((windowWidth, windowHeight))


while True:
    surface.fill((200, 0, 0))