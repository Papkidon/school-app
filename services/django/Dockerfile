# base image
FROM python:3.11

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /django

COPY . .

RUN pip install -r --no-cache-dir requirements.txt
