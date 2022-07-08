###########################################################
# BUILD Image
###########################################################
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS BUILD
WORKDIR /app
COPY . ./
WORKDIR /app/WebAPI
RUN dotnet restore
ENV DOTNET_ReadyToRun=0
ENV DOTNET_TieredPGO=1
ENV DOTNET_TC_QuickJitForLoops=1
RUN dotnet publish -c Release -o out

###########################################################
# PRODUCTION Image
###########################################################
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS PRODUCTION
WORKDIR /app
COPY --from=BUILD /app/WebAPI/out .

EXPOSE 80
EXPOSE 443

ENTRYPOINT ["dotnet", "WebAPI.dll"]