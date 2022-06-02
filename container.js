const fs = require("fs");

class Container {

    constructor(filename) {
        this.filename = filename
        this.data = []

        try {
            console.log('Initializing...')
         
        }
        catch(error) {
            console.log(`Error Initializing ${error}`)
        }
    }

    
    async save(obj) {
        try {
            await this.init()
            obj = {...obj, id: this.data.length + 1}
            console.log(this.data)
            this.data.push(obj)
            await fs.promises.appendFile(this.archivo, JSON.stringify(obj) + '\n')
            return obj.id
        }
        catch (error) {
            console.log(error)
        }
    }

    async getAll() {
        try {
            let allContent = await fs.promises.readFile(this.filename, 'utf-8')
            let objSwap = allContent.split('\n').filter(obj => obj != '')
            let content = objSwap.map(obj => JSON.parse(obj))
            return content
        }
        catch (error) {
            console.log(error)
        }
    }



    async getById(id) {
        try {
            const allContent = await fs.promises.readFile(this.filename, 'utf-8');
            const content = JSON.parse(allContent);
            const contentById = content.find((i) => i.id == id);
            return contentById;
        } catch (error) {
            console.log(error);
        };
    }
    
    async deleteById(id) {

        try {
            const allContent = await fs.promises.readFile(this.filename, 'utf-8');
            const content = JSON.parse(allContent);
            const product = content.filter((i) => i.id !== id);
            await fs.promises.writeFile(this.filename, JSON.stringify(product, null, 2));
        } catch (error) {
            console.log(error)
        }
    };

    deleteAll() {
        this.data = []
        this.write()
    };



    async updateItems(product) {
        try {
            const allContent = await fs.promises.readFile(this.filename, 'utf-8');
            const content = JSON.parse(allContent);

            let indx = content.findIndex((item) => item.id === product.id);
            if (indx == -1) {
                return { error }
            } else {
                content[indx].item = product.item;
                content[indx].price = product.price;
                
                await fs.promises.writeFile(this.filename, JSON.stringify(content, null, 2));
            }
        } catch (error) {
            console.log(error)
        }
    }
};


module.exports = Container;