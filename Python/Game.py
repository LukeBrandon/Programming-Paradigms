class Game():
    def__init__(self):

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
        