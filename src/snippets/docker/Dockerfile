FROM img:version (de quina img partim)

WORKDIR /app (des d'on s'executaran les comandes per defecte)
COPY . . (copiar directori actual de pc host a dins de ruta actual de pc guest (en aquest cas a dins /app, que es el workdir))
RUN npm i (corre comanda "npm i" a dins de workdir)

CMD ["node", "/app/src/index.js"] (això té que estar si o si, o ENTRYPOINT (que serveix per no passar-li paràmetre ara, però li tindria que passar al fer docker run), es la comanda que volem que corri, aqui corre "node" i li passa "/app/src..." com a argument)
