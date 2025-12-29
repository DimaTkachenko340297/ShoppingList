import { defineStore } from 'pinia'

const STORAGE_KEY = 'shoppinglist.v1'

function newId() {
    return crypto.randomUUID()
}

function safeLoad() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function safeSave(value) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  } catch {
    // ignore
  }
}

function seedState() {
  const now = Date.now()

  return {
    lastOpenedListId: null,
    lists: [
      {
        id: 'demo-groceries',
        name: 'Weekly groceries',
        note: 'Quick essentials for the week',
        accent: '#0d6efd',
        createdAt: now,
        updatedAt: now,
        items: [
          { id: newId(), name: 'Milk', quantity: 2, unit: 'pcs', purchased: false, createdAt: now },
          { id: newId(), name: 'Pasta', quantity: 1, unit: 'pack', purchased: false, createdAt: now },
          { id: newId(), name: 'Apples', quantity: 6, unit: 'pcs', purchased: true, createdAt: now }
        ]
      },
      {
        id: 'demo-pharmacy',
        name: 'Pharmacy',
        note: 'Small health restock',
        accent: '#198754',
        createdAt: now,
        updatedAt: now,
        items: [
          { id: newId(), name: 'Band-aids', quantity: 1, unit: 'pack', purchased: false, createdAt: now },
          { id: newId(), name: 'Vitamin C', quantity: 1, unit: 'pack', purchased: false, createdAt: now }
        ]
      }
    ]
  }
}

export const useShoppingListsStore = defineStore('shoppingLists', {
  state: () => {
    const loaded = safeLoad()
    if (loaded && Array.isArray(loaded.lists)) {
      return {
        lastOpenedListId: loaded.lastOpenedListId || null,
        lists: loaded.lists
      }
    }
    return seedState()
  },
  getters: {
    sortedLists: (state) => {
      return [...state.lists].sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
    },
    getListById: (state) => {
      return (listId) => state.lists.find(l => String(l.id) == String(listId)) || null
    },
    listStatsById() {
      return (listId) => {
        const list = this.getListById(listId)
        if (!list) return { total: 0, purchased: 0 }
        const total = list.items.length
        const purchased = list.items.filter(i => i.purchased).length
        return { total, purchased }
      }
    }
  },
  actions: {
    persist() {
      safeSave({
        lastOpenedListId: this.lastOpenedListId,
        lists: this.lists
      })
    },
    touchList(listId) {
      const list = this.getListById(listId)
      if (!list) return
      list.updatedAt = Date.now()
    },
    setLastOpenedList(listId) {
      this.lastOpenedListId = String(listId)
      this.persist()
    },
    createList(payload) {
      const id = newId()
      const now = Date.now()
      this.lists.push({
        id,
        name: payload.name,
        note: payload.note || '',
        accent: payload.accent || '#0d6efd',
        createdAt: now,
        updatedAt: now,
        items: []
      })
      this.lastOpenedListId = id
      this.persist()
      return id
    },
    updateList(listId, patch) {
      const list = this.getListById(listId)
      if (!list) return
      list.name = patch.name ?? list.name // name is required, left or right put in list.name?
      list.note = patch.note ?? list.note
      list.accent = patch.accent ?? list.accent
      this.touchList(listId)
      this.persist()
    },
    deleteList(listId) {
      const id = String(listId)
      this.lists = this.lists.filter(l => String(l.id) != id)
      if (this.lastOpenedListId === id) {
        this.lastOpenedListId = this.lists[0]?.id || null
      }
      this.persist()
    },
    addItem(listId, payload) {
      const list = this.getListById(listId)
      if (!list) return
      list.items.push({
        id: newId(),
        name: payload.name,
        quantity: payload.quantity,
        unit: payload.unit || 'pcs',
        purchased: false,
        createdAt: Date.now()
      })
      this.touchList(listId)
      this.persist()
    },
    updateItem(listId, itemId, patch) {
      const list = this.getListById(listId)
      if (!list) return
      const item = list.items.find(i => String(i.id) == String(itemId))
      if (!item) return
      item.name = patch.name ?? item.name
      item.quantity = patch.quantity ?? item.quantity
      item.unit = patch.unit ?? item.unit
      this.touchList(listId)
      this.persist()
    },
    deleteItem(listId, itemId) {
      const list = this.getListById(listId)
      if (!list) return
      list.items = list.items.filter(i => String(i.id) != String(itemId))
      this.touchList(listId)
      this.persist()
    },
    togglePurchased(listId, itemId) {
      const list = this.getListById(listId)
      if (!list) return
      const item = list.items.find(i => String(i.id) == String(itemId))
      if (!item) return
      item.purchased = !item.purchased
      this.touchList(listId)
      this.persist()
    }
  }
})