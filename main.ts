import dotenv from 'dotenv'
import App from './src/app/app'

dotenv.config()

const DB_SYNC = "dbsync"

async function main(){
	const app = new App()
	const args = process.argv.slice(2)
	const dbsync = args[0]
	app.config()
	app.mount({syncDb:(dbsync === DB_SYNC)})
	if (!(dbsync === DB_SYNC)){
		app.run()
	}
}

main()