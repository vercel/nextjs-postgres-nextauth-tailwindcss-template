# Node.js 18 버전을 기반으로 하는 이미지 사용
FROM node:18

# 컨테이너 내에서 작업 디렉토리 설정 (예: /app)
WORKDIR /app

# pnpm 설치
RUN npm install -g pnpm

# package.json, pnpm-lock.yaml 파일을 컨테이너에 복사
# pnpm을 사용하는 경우 pnpm-lock.yaml 파일이 존재할 수 있습니다
COPY package*.json pnpm-lock.yaml* ./

# pnpm을 사용하여 필요한 패키지 설치
RUN pnpm install

# 나머지 파일들을 컨테이너의 작업 디렉토리로 복사
COPY . .

# Next.js 애플리케이션 빌드
RUN pnpm run build

# 3000 포트 노출
EXPOSE 3000

# 애플리케이션 실행
CMD ["pnpm", "start"]
