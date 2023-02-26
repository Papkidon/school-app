install:
		npm install

run:  # start the app
	npm run build
	npm run start:dev

db-migrate:  # create migration and apply changes
	npx prisma migrate dev

db-seed:  # seed the database
	npx prisma db seed

db-reset:  # reset the database ( drop db, migrate and seed )
	npx prisma migrate reset

db-first-run: db-migrate db-reset  #  create migration, apply changes and reset the db

test: tests
tests:  # run tests
	npm test

test-update-snapshots:  # run test and update tests snapshots
	npm test -- -u
