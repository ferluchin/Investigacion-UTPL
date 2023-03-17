import pygame
import sys
import random

pygame.init()

WIDTH = 800
HEIGHT = 600
CELL_SIZE = 20

WHITE = (255, 255, 255)
EASY_BLACK = (40, 40, 40)
GREEN = (0, 255, 0)
RED = (255, 0, 0)

screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Snake Game")

clock = pygame.time.Clock()
font = pygame.font.Font(None, 36)


def draw_text(text, x, y):
    text_surface = font.render(text, True, WHITE)
    text_rect = text_surface.get_rect()
    text_rect.x, text_rect.y = x, y
    screen.blit(text_surface, text_rect)


def ask_play_again():
    draw_text("¿Jugar de nuevo? (Y/N)", WIDTH // 2 - 130, HEIGHT // 2)
    pygame.display.flip()

    while True:
        for event in pygame.event.get():
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_y:
                    return True
                elif event.key == pygame.K_n:
                    return False
            elif event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()


def random_food_position():
    return (random.randint(0, WIDTH // CELL_SIZE - 1) * CELL_SIZE, random.randint(0, HEIGHT // CELL_SIZE - 1) * CELL_SIZE)


snake = [(CELL_SIZE * 3, CELL_SIZE * 3), (CELL_SIZE *
                                          2, CELL_SIZE * 3), (CELL_SIZE, CELL_SIZE * 3)]
snake_dir = (CELL_SIZE, 0)
food_pos = random_food_position()
score = 0
speed = 10

while True:
    game_over = False

    while not game_over:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            if event.type == pygame.KEYDOWN:
                if event.key in (pygame.K_UP, pygame.K_w) and snake_dir[1] == 0:
                    snake_dir = (0, -CELL_SIZE)
                if event.key in (pygame.K_DOWN, pygame.K_s) and snake_dir[1] == 0:
                    snake_dir = (0, CELL_SIZE)
                if event.key in (pygame.K_LEFT, pygame.K_a) and snake_dir[0] == 0:
                    snake_dir = (-CELL_SIZE, 0)
                if event.key in (pygame.K_RIGHT, pygame.K_d) and snake_dir[0] == 0:
                    snake_dir = (CELL_SIZE, 0)

        new_head = (snake[0][0] + snake_dir[0], snake[0][1] + snake_dir[1])

        if (new_head[0] < 0 or new_head[0] >= WIDTH or new_head[1] < 0 or new_head[1] >= HEIGHT or new_head in snake):
            break

        snake.insert(0, new_head)

        if new_head == food_pos:
            score += 1
            speed += 1
            food_pos = random_food_position()
        else:
            snake.pop()

        screen.fill(EASY_BLACK)

        for segment in snake:
            pygame.draw.rect(screen, GREEN, pygame.Rect(
                segment[0], segment[1], CELL_SIZE, CELL_SIZE))

        pygame.draw.rect(screen, RED, pygame.Rect(
            food_pos[0], food_pos[1], CELL_SIZE, CELL_SIZE))

        draw_text(f"Score: {score}", 10, 10)

        pygame.display.flip()
        clock.tick(speed)

    if ask_play_again():
        snake = [(CELL_SIZE * 3, CELL_SIZE * 3), (CELL_SIZE *
                                                  2, CELL_SIZE * 3), (CELL_SIZE, CELL_SIZE * 3)]
        snake_dir = (CELL_SIZE, 0)
        food_pos = random_food_position()
        score = 0
        speed = 10
    else:
        pygame.quit()
        sys.exit()
