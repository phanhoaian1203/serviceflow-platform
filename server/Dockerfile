# Base image for running the application
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app
EXPOSE 5000

# Image for building the application
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy csproj files and restore dependencies
COPY ["ServiceFlow.Api/ServiceFlow.Api.csproj", "ServiceFlow.Api/"]
COPY ["ServiceFlow.Application/ServiceFlow.Application.csproj", "ServiceFlow.Application/"]
COPY ["ServiceFlow.Domain/ServiceFlow.Domain.csproj", "ServiceFlow.Domain/"]
COPY ["ServiceFlow.Infrastructure/ServiceFlow.Infrastructure.csproj", "ServiceFlow.Infrastructure/"]
RUN dotnet restore "ServiceFlow.Api/ServiceFlow.Api.csproj"

# Copy all source files and build
COPY . .
WORKDIR "/src/ServiceFlow.Api"
RUN dotnet build "ServiceFlow.Api.csproj" -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish "ServiceFlow.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Production runtime stage
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ServiceFlow.Api.dll"]
