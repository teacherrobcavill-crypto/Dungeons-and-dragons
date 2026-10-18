import React, { useState } from 'react';
import Button from '../common/Button';
import { shopCatalog } from '../../data/equipment';

export default function Inventory({
    items = [],
    equippedItems = [],
    gold = 25,
    onAddItem,
    onRemoveItem,
    onEquipItem,
    onUnequipItem,
    onUseConsumable,
    onBuyItem
}) {
    const [newItem, setNewItem] = useState('');
    const [showAdd, setShowAdd] = useState(false);
    const [activeSubTab, setActiveSubTab] = useState('backpack');

    const handleAdd = () => {
        if (newItem.trim()) {
            onAddItem({ name: newItem.trim(), quantity: 1, type: 'gear' });
            setNewItem('');
            setShowAdd(false);
        }
    };

    const getItemIcon = (item) => {
        if (item.icon) return item.icon;
        const lower = (item.name || '').toLowerCase();
        if (lower.includes('sword') || lower.includes('dagger') || lower.includes('axe') || lower.includes('mace') || lower.includes('rapier') || lower.includes('hammer')) return '⚔️';
        if (lower.includes('shield')) return '🛡️';
        if (lower.includes('potion') || lower.includes('elixir')) return '🧪';
        if (lower.includes('gold') || lower.includes('coin')) return '💰';
        if (lower.includes('key')) return '🔑';
        if (lower.includes('torch')) return '🔥';
        if (lower.includes('food') || lower.includes('ration')) return '🍖';
        if (lower.includes('scroll')) return '📜';
        if (lower.includes('book') || lower.includes('tome')) return '📕';
        if (lower.includes('ring') || lower.includes('amulet') || lower.includes('cloak')) return '💍';
        if (lower.includes('armor') || lower.includes('mail') || lower.includes('leather') || lower.includes('plate')) return '🦺';
        if (lower.includes('bow') || lower.includes('crossbow')) return '🏹';
        if (lower.includes('staff') || lower.includes('wand') || lower.includes('rod')) return '🪄';
        return '📦';
    };

    const isItemEquippable = (item) => {
        const lower = (item.name || '').toLowerCase();
        return (
            ['weapon', 'armor', 'shield', 'magic'].includes(item.type) ||
            Boolean(item.damageDice || item.baseAc || item.acBonus) ||
            lower.includes('sword') ||
            lower.includes('armor') ||
            lower.includes('shield') ||
            lower.includes('bow') ||
            lower.includes('dagger') ||
            lower.includes('axe') ||
            lower.includes('cloak') ||
            lower.includes('ring') ||
            lower.includes('staff') ||
            lower.includes('wand')
        );
    };

    const isItemConsumable = (item) => {
        const lower = (item.name || '').toLowerCase();
        return (
            item.type === 'consumable' ||
            Boolean(item.healDice) ||
            lower.includes('potion') ||
            lower.includes('ration') ||
            lower.includes('scroll') ||
            lower.includes('elixir')
        );
    };

    const defaultShopItems = shopCatalog && shopCatalog.length > 0 ? shopCatalog : [
        { id: 'shop-heal-pot', name: 'Potion of Healing', type: 'consumable', healDice: '2d4+2', costGp: 15, icon: '🧪', description: 'Restores 2d4+2 Hit Points immediately.' },
        { id: 'shop-greater-pot', name: 'Potion of Greater Healing', type: 'consumable', healDice: '4d4+4', costGp: 40, icon: '🧪', description: 'Restores 4d4+4 Hit Points immediately.' },
        { id: 'shop-longsword-1', name: '+1 Magic Longsword', type: 'weapon', damageDice: '1d8', bonus: 1, damageType: 'Slashing', costGp: 50, icon: '⚔️', description: 'DMG Armament: +1 bonus to attack and damage rolls.' },
        { id: 'shop-studded', name: 'Studded Leather Armor', type: 'armor', armorType: 'light', baseAc: 12, costGp: 25, icon: '🦺', description: 'Light Armor: AC 12 + DEX modifier.' },
        { id: 'shop-half-plate', name: 'Half Plate Armor', type: 'armor', armorType: 'medium', baseAc: 15, costGp: 60, icon: '🦺', description: 'Medium Armor: AC 15 + DEX modifier (max 2).' },
        { id: 'shop-shield-1', name: '+1 Sentinel Shield', type: 'shield', acBonus: 2, bonus: 1, costGp: 45, icon: '🛡️', description: '+3 total AC bonus while wielded.' },
        { id: 'shop-wand-mm', name: 'Wand of Magic Missiles', type: 'weapon', damageDice: '3d4+3', bonus: 1, damageType: 'Force', costGp: 55, icon: '🪄', description: 'DMG Implement: Fires unerring Force bolts (3d4+3).' },
        { id: 'shop-flame-tongue', name: 'Flame Tongue Greatsword', type: 'weapon', damageDice: '4d6', bonus: 2, damageType: 'Fire', costGp: 100, icon: '🔥', description: 'Rare DMG Armament: Blazes with 2d6 Slashing + 2d6 Fire damage!' }
    ];

    return (
        <div className="space-y-4">
            {/* Gold Banner */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-400/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-xl">💰</span>
                    <div>
                        <span className="text-xs font-semibold text-amber-900 dark:text-amber-200 block">
                            Adventurer&apos;s Gold Purse
                        </span>
                        <span className="text-[10px] text-amber-700 dark:text-amber-300/80">
                            Spend at merchants or loot from dungeons
                        </span>
                    </div>
                </div>
                <span className="text-base font-display font-bold text-amber-700 dark:text-amber-300">
                    {gold} gp
                </span>
            </div>

            {/* Sub-Tabs: Backpack vs Merchant Shop */}
            <div className="grid grid-cols-2 gap-1.5 bg-gray-100 dark:bg-slate-800 p-1 rounded-xl">
                <button
                    type="button"
                    onClick={() => setActiveSubTab('backpack')}
                    className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        activeSubTab === 'backpack'
                            ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm'
                            : 'text-gray-600 dark:text-gray-400'
                    }`}
                >
                    🎒 Gear & Loadout ({items.length})
                </button>
                <button
                    type="button"
                    onClick={() => setActiveSubTab('shop')}
                    className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        activeSubTab === 'shop'
                            ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-sm'
                            : 'text-gray-600 dark:text-gray-400'
                    }`}
                >
                    🛒 DMG Armory & Shop
                </button>
            </div>

            {activeSubTab === 'backpack' ? (
                <>
                    {/* Equipped Items Section */}
                    {equippedItems.length > 0 && (
                        <div className="space-y-1.5">
                            <h5 className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                                ⚔️ Currently Equipped ({equippedItems.length})
                            </h5>
                            {equippedItems.map((eq) => (
                                <div
                                    key={eq.id || eq.name}
                                    className="flex items-center justify-between p-2.5 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-300 dark:border-indigo-700 text-xs"
                                >
                                    <div className="flex items-center gap-2 min-w-0">
                                        <span className="text-lg">{getItemIcon(eq)}</span>
                                        <div className="min-w-0">
                                            <p className="font-bold text-gray-900 dark:text-white truncate">{eq.name}</p>
                                            <span className="text-[10px] text-indigo-700 dark:text-indigo-300">
                                                {eq.damageDice ? `Dmg: ${eq.damageDice}` : eq.baseAc ? `AC: ${eq.baseAc}` : 'Equipped'}
                                                {eq.bonus ? ` (+${eq.bonus})` : ''}
                                            </span>
                                        </div>
                                    </div>
                                    {onUnequipItem && (
                                        <button
                                            type="button"
                                            onClick={() => onUnequipItem(eq.id)}
                                            className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-700 text-gray-700 dark:text-gray-200 text-[10px] font-semibold hover:bg-red-100 dark:hover:bg-red-900/40"
                                        >
                                            Unequip
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Header + Custom Item Add */}
                    <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            Inventory Items
                        </h4>
                        <button
                            type="button"
                            onClick={() => setShowAdd(!showAdd)}
                            className="w-7 h-7 rounded-lg bg-primary-100 dark:bg-primary-900/40 hover:bg-primary-200 text-primary-600 dark:text-primary-400 flex items-center justify-center transition-colors text-sm font-bold"
                        >
                            {showAdd ? '×' : '+'}
                        </button>
                    </div>

                    {showAdd && (
                        <div className="p-3 bg-gray-50 dark:bg-slate-700 rounded-lg animate-fade-in">
                            <input
                                type="text"
                                value={newItem}
                                onChange={(e) => setNewItem(e.target.value)}
                                placeholder="Item name..."
                                className="input text-sm mb-2"
                                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                            />
                            <Button size="sm" variant="primary" onClick={handleAdd} className="w-full">
                                Add Item
                            </Button>
                        </div>
                    )}

                    {/* Items List */}
                    <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                        {items.length === 0 ? (
                            <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-4">No items yet</p>
                        ) : (
                            items.map((item) => {
                                const isEquipped = equippedItems.some((e) => e.id === item.id || e.name === item.name);
                                const canEquip = isItemEquippable(item);
                                const canUse = isItemConsumable(item);
                                return (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between p-2.5 bg-gray-50 dark:bg-slate-700/80 rounded-xl group hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors border border-gray-200/60 dark:border-slate-600"
                                    >
                                        <div className="flex items-center gap-2.5 min-w-0">
                                            <span className="text-xl">{getItemIcon(item)}</span>
                                            <div className="min-w-0">
                                                <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                                                    {item.name}
                                                    {item.quantity > 1 && (
                                                        <span className="ml-1.5 text-xs font-bold text-primary-600 dark:text-primary-400">
                                                            ×{item.quantity}
                                                        </span>
                                                    )}
                                                </p>
                                                {item.description && (
                                                    <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                                                        {item.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1 flex-shrink-0">
                                            {canUse && onUseConsumable && (
                                                <button
                                                    type="button"
                                                    onClick={() => onUseConsumable(item)}
                                                    className="px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-semibold"
                                                >
                                                    Use
                                                </button>
                                            )}
                                            {canEquip && onEquipItem && !isEquipped && (
                                                <button
                                                    type="button"
                                                    onClick={() => onEquipItem(item)}
                                                    className="px-2 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-semibold"
                                                >
                                                    Equip
                                                </button>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => onRemoveItem(item.id)}
                                                className="p-1 opacity-60 hover:opacity-100 hover:bg-red-100 dark:hover:bg-red-900/40 rounded transition-all"
                                                title="Remove item"
                                            >
                                                <svg className="w-3.5 h-3.5 text-red-500 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </>
            ) : (
                /* DMG Merchant & Magic Item Shop */
                <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Purchase PHB equipment, healing potions, and DMG magic items with your gold:
                    </p>
                    {defaultShopItems.map((shopItem) => {
                        const canAfford = gold >= (shopItem.costGp || 15);
                        return (
                            <div
                                key={shopItem.id || shopItem.name}
                                className="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex items-center justify-between gap-2"
                            >
                                <div className="min-w-0">
                                    <div className="flex items-center gap-1.5">
                                        <span>{shopItem.icon || '📦'}</span>
                                        <span className="text-xs font-bold text-gray-900 dark:text-white truncate">
                                            {shopItem.name}
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                                        {shopItem.description}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    disabled={!canAfford}
                                    onClick={() => onBuyItem && onBuyItem(shopItem)}
                                    className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 flex-shrink-0 transition-all"
                                >
                                    Buy ({shopItem.costGp} gp)
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Footer Count */}
            <div className="pt-3 border-t border-gray-100 dark:border-slate-700 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Items in Pack:</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">{items.length}</span>
            </div>
        </div>
    );
}
