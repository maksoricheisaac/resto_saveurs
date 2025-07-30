# Gestion des Accompagnements - Resto Saveurs

## Nouveautés Ajoutées

### 1. Modèle de Données - Accompagnements

Un nouveau modèle `SideDish` a été ajouté au schéma Prisma avec les champs suivants :
- `id` : Identifiant unique
- `name` : Nom de l'accompagnement
- `description` : Description détaillée
- `price` : Prix en euros
- `image` : URL de l'image (optionnel)
- `isAvailable` : Statut de disponibilité
- `createdAt` / `updatedAt` : Timestamps

### 2. Interface d'Administration

#### Page de Gestion des Accompagnements
- **URL** : `/admin/side-dishes`
- **Fonctionnalités** :
  - Liste des accompagnements avec pagination
  - Recherche par nom et description
  - Tri par nom, prix ou date de création
  - Filtres de disponibilité
  - Ajout, modification et suppression d'accompagnements
  - Basculement de la disponibilité

#### Composants Admin Créés
- `SideDishHeader` : En-tête avec bouton d'ajout
- `SideDishForm` : Formulaire de création/modification
- `SideDishFilters` : Filtres de recherche et tri
- `SideDishList` : Affichage en grille des accompagnements

### 3. Menu Public Amélioré

#### Section Accompagnements
- Affichage dédié des accompagnements disponibles
- Design cohérent avec le reste du menu
- Images, descriptions et prix clairement affichés

#### Améliorations des Requêtes
- Récupération simultanée des plats et accompagnements
- Filtrage avancé par catégorie, prix, recherche
- Tri personnalisable
- Optimisation des performances

### 4. Actions et API

#### Actions Admin (`src/actions/admin/side-dish-action.ts`)
- `getSideDishes()` : Récupération avec pagination et filtres
- `createSideDish()` : Création d'un nouvel accompagnement
- `updateSideDish()` : Modification d'un accompagnement
- `deleteSideDish()` : Suppression d'un accompagnement
- `toggleSideDishAvailability()` : Basculement de disponibilité
- `getSideDishById()` : Récupération d'un accompagnement spécifique

#### Actions Publiques (`src/actions/public/side-dish-action.ts`)
- `getPublicSideDishes()` : Récupération des accompagnements disponibles

### 5. Améliorations Générales

#### Requêtes de Plats Améliorées
- Filtrage par prix (min/max)
- Tri personnalisable (ascendant/descendant)
- Filtrage par disponibilité
- Recherche avancée

#### Dashboard Admin
- Statistiques des accompagnements
- Compteurs mis à jour
- Interface améliorée

#### Composants UI
- Pagination réutilisable
- Cartes de statistiques
- Filtres avancés

## Utilisation

### Pour les Administrateurs

1. **Accéder à la gestion** : Menu admin → "Accompagnements"
2. **Ajouter un accompagnement** : Cliquer sur "Nouvel Accompagnement"
3. **Modifier** : Cliquer sur "Modifier" sur une carte d'accompagnement
4. **Gérer la disponibilité** : Utiliser le bouton œil pour activer/désactiver
5. **Rechercher** : Utiliser les filtres en haut de page

### Pour les Visiteurs

Les accompagnements sont automatiquement affichés dans la section dédiée du menu public, après les plats principaux.

## Structure des Fichiers

```
src/
├── actions/
│   ├── admin/side-dish-action.ts
│   └── public/side-dish-action.ts
├── components/
│   ├── admin/side-dish/
│   │   ├── side-dish-header.tsx
│   │   ├── side-dish-form.tsx
│   │   ├── side-dish-filters.tsx
│   │   ├── side-dish-list.tsx
│   │   └── index.ts
│   └── public/menu/
│       └── side-dishes-section.tsx
├── types/
│   └── menu.ts (types SideDish ajoutés)
└── app/
    ├── admin/side-dishes/
    │   ├── page.tsx
    │   └── side-dishes.tsx
    └── (public)/menu/
        └── menu.tsx (modifié)
```

## Migration de Base de Données

La migration `add-side-dishes` a été créée pour ajouter la table `side_dishes` à la base de données.

## Prochaines Étapes Possibles

1. **Gestion des Images** : Upload et stockage d'images pour les accompagnements
2. **Catégorisation** : Ajouter des catégories aux accompagnements
3. **Prix Dynamiques** : Gestion des prix selon les saisons
4. **Allergènes** : Ajout d'informations sur les allergènes
5. **Statistiques Avancées** : Graphiques de popularité des accompagnements 