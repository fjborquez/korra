export function getTranslatedCategory(category: string) {
    switch (category) {
      case 'Bakery':
        return 'Panadería';
      case 'Butchery':
        return 'Carnicería';
      case 'Cheeses and Cold Cuts':
        return 'Quesos y embutidos';
      case 'Dairy':
        return 'Lácteos';
      case 'Fruits and Vegetables':
        return 'Frutas y verduras';
      case 'Flours':
        return 'Harinas';
      case 'Oils, Salt, and Seasonings':
        return 'Aceites, sal y condimentos';
      case 'Pasta':
        return 'Pastas';
      case 'Sauces and Dressings':
        return 'Salsas y aderezos';
      case 'Instant and Soups':
        return 'Instant and Soups';
      case 'Beverages':
        return 'Bebidas';
      case 'Alcoholic Beverages':
        return 'Bebidas alcohólicas';
      default:
        return '';
    }
  }
