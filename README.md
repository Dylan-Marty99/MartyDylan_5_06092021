# MartyDylan-5-OpenClassrooms-Orinoco

Cinquième projet OpenClassrooms : "Construisez un site e-commerce en JavaScript". L'objectif de ce projet est de créer la partie front-end d'un site e-commerce en JavaScript vanilla.

Aucune maquette n'a été fournis, l'entièreté du site a donc dû être designé. Il s'agit d'un MVP, par conséquent aucune transaction n'est réellement effectué. Vous pouvez voir ci dessous une image contenant une partie de la page d'accueil du site.

La partie back-end a été fournis au préalable, vous pouvez la retrouver [ici](https://github.com/OpenClassrooms-Student-Center/JWDP5), ainsi que le [brief du projet ici](https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P5/P5_Spe%CC%81cifications+fonctionnelles+Orinoco.pdf).


<img width="1440" alt="Accueil-OriBears" src="https://user-images.githubusercontent.com/85873409/142409255-c49d971b-4a33-4b7b-bfe2-92a1c5673196.png">


# Langages et technologies utilisés

* HTML5
* CSS3
* SASS
* JavaScript
* Git et Github

# Fonctionnalités attendues

* une page de vue sous forme de liste, montrant tous les articles disponibles à la vente ;
* une page “produit”, qui affiche de manière dynamique l'élément sélectionné par l'utilisateur et lui permet de personnaliser le produit et de l'ajouter à son panier ;
* une page “panier” contenant un résumé des produits dans le panier, le prix total et un formulaire permettant de passer une commande. Les données du formulaire doivent être correctes et bien formatées avant d'être renvoyées au back-end. Par exemple, pas de texte dans les champs date ;
* une page de confirmation de commande, remerciant l'utilisateur pour sa commande, et indiquant le prix total et l'identifiant de commande envoyé par le serveur

# Contraintes techniques

* Pour le MVP, la personnalisation du produit ne sera pas fonctionnelle : la page contenant un seul article aura un menu déroulant permettant à l'utilisateur de choisir une option de personnalisation, mais celle-ci ne sera ni envoyée au serveur ni reflétée dans la réponse du serveur.
* Le code source devra être indenté et utiliser des commentaires. Il devra également utiliser des fonctions globales.
* Concernant l’API, des promesses devront être utilisées pour éviter les rappels.
* Les inputs des utilisateurs doivent être validés avant l’envoi à l’API.

# Tester le site

Tout d'abord vous aurez besoin d'avoir Node.js et npm d'installé en local sur votre machine.

Ensuite, après avoir cloné le dépôt, éxecutez la commande `npm install` 

Pour finir vous devrez éxcuter la commande `node server` en étant dans le dossier back-end.  
Le serveur devrait s'éxecuter sur localhost et par défaut sur le port 3000.
