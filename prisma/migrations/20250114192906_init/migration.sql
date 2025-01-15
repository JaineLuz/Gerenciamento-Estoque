-- CreateTable
CREATE TABLE "SuperUsuario" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "senha" VARCHAR(15) NOT NULL,

    CONSTRAINT "SuperUsuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "descricao" TEXT,
    "quantidade" INTEGER NOT NULL,
    "valorUnitario" DECIMAL(10,2) NOT NULL,
    "categoria" VARCHAR(30),

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venda" (
    "id" SERIAL NOT NULL,
    "dataVenda" TIMESTAMP(3) NOT NULL,
    "quantPecas" INTEGER NOT NULL,
    "valorDespesas" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Venda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProdutoVendas" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ProdutoVendas_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "SuperUsuario_email_key" ON "SuperUsuario"("email");

-- CreateIndex
CREATE INDEX "_ProdutoVendas_B_index" ON "_ProdutoVendas"("B");

-- AddForeignKey
ALTER TABLE "_ProdutoVendas" ADD CONSTRAINT "_ProdutoVendas_A_fkey" FOREIGN KEY ("A") REFERENCES "Produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProdutoVendas" ADD CONSTRAINT "_ProdutoVendas_B_fkey" FOREIGN KEY ("B") REFERENCES "Venda"("id") ON DELETE CASCADE ON UPDATE CASCADE;
