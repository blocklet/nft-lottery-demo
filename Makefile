dep:
	@echo "Install dependencies required for this repo..."
	@yarn
	@cp .env.bac .env

test:
	@echo "Running test suites..."

build:
	@echo "Building the software..."

bundle:
	@echo "Bundling the software..."
	@npm run bundle

github-action-init:
	@make dep

include .makefiles/*.mk
