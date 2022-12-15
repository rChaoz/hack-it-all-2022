Executare
=========

Folosind un terminal (e.g. cmd, **powershell nu functioneaza pentru comanda cu `serve`**):
- in folder-ul 'frontend' se va rula:
  - `npm install`
  - `npm build`
  - `serve -s build` (inainte de prima rulare este necesar `npm install -g serve`)
  - site-ul se poate accesa la http://localhost:3000
- in folder-ul 'backend' se va rula:
  - `gradlew generateDatabase` (inainte de prima rulare sau oricand se doreste re-initializarea datelor, **poate dura cateva minute**)
  - `gradlew run`
  - o data ce backend-ul ruleaza se poate folosi site-ul de la frontend