import fs from 'fs/promises';
import path from 'path';

export class Database {
    database = {};

    persist() {
        fs.writeFile('db.json', JSON.stringify(this.database))
    }

    async persistLoad() {
        const filePath = path.resolve('db.json');

        try {
            await fs.access(filePath);  // Verifica se o arquivo existe
            const fileData = await fs.readFile(filePath, 'utf-8');  // Lê o arquivo como texto
            this.database = JSON.parse(fileData);  // Analisa o conteúdo como JSON
            console.log("persistLoad:");
            console.log(this.database);
        } catch (error) {
            if (error.code === 'ENOENT') {
                // O arquivo não existe, você pode lidar com isso aqui
                console.log("Arquivo 'db.json' não encontrado.");
                this.database = {}; // Inicialize o objeto de banco de dados vazio ou faça outra ação apropriada.
            } else {
                // Trate outros erros de forma apropriada
                console.error("Erro ao acessar o arquivo 'db.json':", error);
            }
        }
    }

    async select(table, search) {
        if (Object.keys(this.database).length === 0)
            await this.persistLoad();

        if (search) {
            return await this.database[table].filter(row => {
                return Object.entries(search).some(([key, value]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase())
                })
            })
        }
        else
            return this.database[table];
    }

    async insert(table, data) {
        if (Object.keys(this.database).length === 0)
            await this.persistLoad();

        if (!this.database[table])
            this.database[table] = []

        this.database[table].push(data);
        this.persist();
        return data;
    }

    update(table, id, data) {
        const rowIndex = this.database[table].findIndex(row => row.id == id)

        if (rowIndex > -1) {
            this.database[table][rowIndex] = { id, ...data }
            this.persist()
        }
    }

    delete(table, id) {
        const rowIndex = this.database[table].findIndex(row => row.id == id)

        if (rowIndex > -1) {
            this.database[table].splice(rowIndex, 1)
            this.persist()
        }
    }
}