import { Injectable, signal, computed } from '@angular/core';

export interface House {
  id: string;
  name: string;
  location: string;
  isDefault: boolean;
  type: 'home' | 'beach' | 'office';
  residents: { name: string; avatar: string }[];
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'Dairy' | 'Fruits' | 'Vegetables' | 'Meat' | 'Pantry';
  quantity: string;
  expiryDate: Date;
  imageUrl: string;
  description: string;
  houseId: string;
}

@Injectable({
  providedIn: 'root'
})
export class LarderService {
  private houses = signal<House[]>([
    {
      id: '1',
      name: 'Hogar Principal',
      location: 'Madrid, ES',
      isDefault: true,
      type: 'home',
      residents: [
        { name: 'Ana', avatar: 'https://i.pravatar.cc/150?u=ana' },
        { name: 'Luis', avatar: 'https://i.pravatar.cc/150?u=luis' }
      ]
    },
    {
      id: '2',
      name: 'Casa de la Playa',
      location: 'Valencia, ES',
      isDefault: false,
      type: 'beach',
      residents: [
        { name: 'Marta', avatar: 'https://i.pravatar.cc/150?u=marta' }
      ]
    }
  ]);

  private inventory = signal<InventoryItem[]>([
    {
      id: '101',
      name: 'Organic Whole Milk',
      category: 'Dairy',
      quantity: '1.5 Liters',
      expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      imageUrl: 'https://images.unsplash.com/photo-1550583724-125581f77833?auto=format&fit=crop&q=80&w=800',
      description: 'Sourced from grass-fed cows. Non-homogenized and rich in vitamin D.',
      houseId: '1'
    },
    {
      id: '102',
      name: 'Hass Avocados',
      category: 'Fruits',
      quantity: '4 units',
      expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      imageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=800',
      description: 'Creamy and rich avocados, perfect for toast or guacamole.',
      houseId: '1'
    },
    {
      id: '103',
      name: 'Baby Carrots',
      category: 'Vegetables',
      quantity: '500g',
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=800',
      description: 'Sweet and crunchy baby carrots, great for snacking.',
      houseId: '1'
    },
    {
      id: '104',
      name: 'Strawberries',
      category: 'Fruits',
      quantity: '1 pack',
      expiryDate: new Date(),
      imageUrl: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=800',
      description: 'Fresh and sweet strawberries, perfect for desserts.',
      houseId: '1'
    },
    {
      id: '105',
      name: 'Parmesan',
      category: 'Dairy',
      quantity: '200g',
      expiryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      imageUrl: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&q=80&w=800',
      description: 'Aged parmesan cheese with a rich, nutty flavor.',
      houseId: '1'
    },
    {
      id: '106',
      name: 'Valencia Oranges',
      category: 'Fruits',
      quantity: '6 units',
      expiryDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      imageUrl: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&q=80&w=800',
      description: 'Juicy Valencia oranges, ideal for fresh juice.',
      houseId: '1'
    }
  ]);

  activeHouseId = signal<string>('1');
  
  allHouses = this.houses.asReadonly();
  
  activeHouse = computed(() => this.houses().find(h => h.id === this.activeHouseId()));
  
  activeInventory = computed(() => this.inventory().filter(item => item.houseId === this.activeHouseId()));

  getHouseById(id: string) {
    return this.houses().find(h => h.id === id);
  }

  getItemById(id: string) {
    return this.inventory().find(i => i.id === id);
  }

  updateItemQuantity(id: string, newQuantity: string) {
    this.inventory.update(items => items.map(i => i.id === id ? { ...i, quantity: newQuantity } : i));
  }

  removeItem(id: string) {
    this.inventory.update(items => items.filter(i => i.id !== id));
  }
}
