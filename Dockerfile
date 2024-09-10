# Fase 1: Build dell'applicazione React
FROM oven/bun:latest AS builder

# Imposta la directory di lavoro
WORKDIR /app

# Copia il file package.json e bun.lockb per installare le dipendenze
COPY package.json bun.lockb ./

# Installa le dipendenze senza ricostruire l'intera immagine
RUN bun install --frozen-lockfile

# Copia il resto del codice dell'applicazione
COPY . .

# Costruisci l'applicazione React
RUN bun run build

# Fase 2: Immagine di produzione leggera con Nginx
FROM nginx:alpine AS release

# Copia i file di build dalla fase precedente
COPY --from=builder /app/dist /usr/share/nginx/html

# Esponi la porta 80 per l'applicazione
EXPOSE 80

# Avvia Nginx in modalità foreground
CMD ["nginx", "-g", "daemon off;"]
