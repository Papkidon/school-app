VENV=venv
PYTHON_GLOBAL=python3
BIN=$(VENV)/bin
PYTHON_VENV=${BIN}/python

# for windows
ifeq ($(OS), Windows_NT)
    BIN=$(VENV)/Scripts
endif

.SILENT:
create-venv:
	if [ -d ${VENV} ]; then \
		echo "Virtual environment" \'${VENV}\' "already exists"; \
		$(BIN)/pip install --upgrade -r requirements.txt; \
	else \
		${PYTHON_GLOBAL} -m venv ${VENV}; \
		echo "Virtual environment" \'${VENV}\' "successfully created"; \
	fi;

.SILENT:
reset-venv:
	if [ -d ${VENV} ]; then \
		rm -r ${VENV}; \
		find . -type f -name *.pyc -delete; \
		find . -type d -name __pycache__ -delete; \
		${PYTHON} -m venv ${VENV}; \
		$(BIN)/pip install --upgrade -r requirements.txt; \
		echo "Virtual environment" \'${VENV}\' "successfully reset"; \
	else \
		echo "Virtual environment" \'${VENV}\' "doesn't exist"; \
	fi;
	
run:
	cd dashboards/; ../${PYTHON_VENV} manage.py runserver 0.0.0.0:3001

migrate:
	cd dashboards/; ../${PYTHON_VENV} manage.py makemigrations; ../${PYTHON_VENV} manage.py migrate
