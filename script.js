function checkNumber(num) {
  const winnerNumber = 14;
  const tryAgain = document.getElementById("tryAgain");

  if (num === winnerNumber) {
    // Ocultar juego
    document.getElementById("game").style.display = "none";

    // Mostrar pantalla ganadora
    document.getElementById("winner").classList.remove("hidden");

    // Música
    const music = document.getElementById("music");
    music.play().catch(() => {
      console.log("El navegador bloqueó el autoplay, el usuario deberá dar play manualmente.");
    });

    // Iniciar fuegos artificiales
    startFireworks();

  } else {
    tryAgain.classList.remove("hidden");
    tryAgain.innerText = "❌ Ese no es el número correcto... ¡intenta de nuevo!";
  }
}

/* ==== Fuegos Artificiales ==== */
function startFireworks() {
  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let fireworks = [];

  class Firework {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.particles = [];
      this.createParticles();
    }
    createParticles() {
      for (let i = 0; i < 100; i++) {
        const angle = (Math.PI * 2 * i) / 100;
        const speed = Math.random() * 5 + 2;
        this.particles.push({
          x: this.x,
          y: this.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1
        });
      }
    }
    update() {
      this.particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.01;
      });
    }
    draw() {
      this.particles.forEach(p => {
        ctx.fillStyle = `rgba(${this.color}, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  }

  function loop() {
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((f, i) => {
      f.update();
      f.draw();
      if (f.particles.every(p => p.alpha <= 0)) {
        fireworks.splice(i, 1);
      }
    });

    if (Math.random() < 0.05) {
      fireworks.push(
        new Firework(
          Math.random() * canvas.width,
          Math.random() * canvas.height / 2,
          `${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}`
        )
      );
    }

    requestAnimationFrame(loop);
  }

  loop();
}
