import pygame
import sys

# Initialize pygame
pygame.init()

# Screen dimensions
WIDTH = 800
HEIGHT = 600

# Colors
WHITE = (255, 255, 255)
EASY_BLACK = (40, 40, 40)

# Paddle dimensions
PADDLE_WIDTH = 10
PADDLE_HEIGHT = 100
PADDLE_SPEED = 10

# Ball dimensions
BALL_SIZE = 10
BALL_SPEED = 5

# Scores
score_a = 0
score_b = 0
score_limit = 7
game_over = False

# Font
font = pygame.font.Font(None, 36)


def draw_text(text, x, y):
    text_surface = font.render(text, True, WHITE)
    text_rect = text_surface.get_rect()
    text_rect.x, text_rect.y = x, y
    screen.blit(text_surface, text_rect)


def draw_score(score_a, score_b):
    draw_text(str(score_a), WIDTH / 2 - 60, 10)
    draw_text(str(score_b), WIDTH / 2 + 40, 10)


# Create screen
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Pong-inspired Game")

# Create paddles and ball
paddle_a = pygame.Rect(20, HEIGHT / 2 - PADDLE_HEIGHT /
                       2, PADDLE_WIDTH, PADDLE_HEIGHT)
paddle_b = pygame.Rect(WIDTH - 30, HEIGHT / 2 -
                       PADDLE_HEIGHT / 2, PADDLE_WIDTH, PADDLE_HEIGHT)
ball = pygame.Rect(WIDTH / 2 - BALL_SIZE / 2, HEIGHT /
                   2 - BALL_SIZE / 2, BALL_SIZE, BALL_SIZE)

ball_dx = BALL_SPEED
ball_dy = BALL_SPEED

# Main game loop
while True:  # Cambia el bucle principal para que se ejecute siempre
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()

    keys = pygame.key.get_pressed()

    if keys[pygame.K_w] and paddle_a.top > 0:
        paddle_a.y -= PADDLE_SPEED
    if keys[pygame.K_s] and paddle_a.bottom < HEIGHT:
        paddle_a.y += PADDLE_SPEED

    if keys[pygame.K_UP] and paddle_b.top > 0:
        paddle_b.y -= PADDLE_SPEED
    if keys[pygame.K_DOWN] and paddle_b.bottom < HEIGHT:
        paddle_b.y += PADDLE_SPEED

    ball.x += ball_dx
    ball.y += ball_dy

    if ball.colliderect(paddle_a) or ball.colliderect(paddle_b):
        ball_dx = -ball_dx

    if ball.top <= 0 or ball.bottom >= HEIGHT:
        ball_dy = -ball_dy

    if ball.left <= 0:
        score_b += 1
        ball.x = WIDTH / 2 - BALL_SIZE / 2
        ball.y = HEIGHT / 2 - BALL_SIZE / 2

    if ball.right >= WIDTH:
        score_a += 1
        ball.x = WIDTH / 2 - BALL_SIZE / 2
        ball.y = HEIGHT / 2 - BALL_SIZE / 2

    if score_a >= score_limit or score_b >= score_limit:
        game_over = True
        winner = "A" if score_a > score_b else "B"
        draw_text(f"¡Jugador {winner} ha ganado!",
                  WIDTH / 2 - 150, HEIGHT / 2 - 50)
    else:
        screen.fill(EASY_BLACK)
        pygame.draw.rect(screen, WHITE, paddle_a)
        pygame.draw.rect(screen, WHITE, paddle_b)
        pygame.draw.ellipse(screen, WHITE, ball)
        pygame.draw.aaline(screen, WHITE, (WIDTH // 2, 0),
                           (WIDTH // 2, HEIGHT))

        draw_score(score_a, score_b)

        pygame.display.flip()
        pygame.time.delay(16)

    if game_over:
        draw_text(f"¡Jugador {winner} ha ganado!",
                  WIDTH / 2 - 150, HEIGHT / 2 - 50)
        draw_text("¿Jugar de nuevo? (Y/N)", WIDTH / 2 - 140, HEIGHT / 2 + 30)
        pygame.display.flip()
        pygame.time.delay(3000)  # Agrega un retraso de 3 segundos

        if ask_play_again():
            # Reinicia el juego
            score_a = 0
            score_b = 0
            game_over = False
            ball.x = WIDTH / 2 - BALL_SIZE / 2
            ball.y = HEIGHT / 2 - BALL_SIZE / 2
        else:
            pygame.quit()
            sys.exit()
