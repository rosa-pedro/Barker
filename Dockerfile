FROM node:18.16-alpine3.17 as dist
WORKDIR /app
RUN npm install -g @angular/cli@15.2.0
COPY ./Client/package.json ./Client/package-lock.json ./
RUN npm install
COPY ./Client/. ./
RUN ng build

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["API/API.csproj", "API/"]
RUN dotnet restore "API/API.csproj"
COPY . .
WORKDIR "/src/API"
COPY --from=dist /app/dist/client ./API/wwwroot
RUN dotnet build "API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "API.dll"]
