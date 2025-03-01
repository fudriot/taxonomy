"use strict";

Ext.ns("TYPO3.Taxonomy.Module.UserInterface");

/*                                                                        *
 * This script is part of the TYPO3 project.                              *
 *                                                                        *
 * It is free software; you can redistribute it and/or modify it under    *
 * the terms of the GNU General Public License as published by the Free   *
 * Software Foundation, either version 3 of the License, or (at your      *
 * option) any later version.                                             *
 *                                                                        *
 * This script is distributed in the hope that it will be useful, but     *
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHAN-    *
 * TABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General      *
 * Public License for more details.                                       *
 *                                                                        *
 * You should have received a copy of the GNU General Public License      *
 * along with the script.                                                 *
 * If not, see http://www.gnu.org/licenses/gpl.html                       *
 *                                                                        *
 * The TYPO3 project - inspiring people to share!                         *
 *                                                                        */

define(['Taxonomy/Core/Application', 'Taxonomy/Core/Registry', 'Taxonomy/Module/UserInterface/DocHeader'], function(Application, Registry) {
	
	/**
	 * @class TYPO3.Taxonomy.Module.UserInterface.DocHeader
	 * 
	 * The outermost user interface component.
	 * 
	 * @namespace TYPO3.Taxonomy.Module.UserInterface
	 * @extends Ext.Viewport
	 */
	TYPO3.Taxonomy.Module.UserInterface.Layout = Ext.extend(Ext.Viewport, {

		initComponent: function() {

			var config = {
				renderTo: 'typo3-mod-php',
				layout:'border',
				defaults: {
					collapsible: false,
					split: true,
					bodyStyle: 'padding:15px'
				},
				items: [{
						
					/*
					 * CENTER PANEL
					 */
					xtype: 'panel',
					region:'center',
					margins: '0',
					padding: '0',
					bodyPadding: 0,
					layout:'border',
					cls: 'typo3-fullDoc',
					items: this._getItems()
				}]
			};

			Ext.apply(this, config);
			TYPO3.Taxonomy.Module.UserInterface.Layout.superclass.initComponent.call(this);
		},
		
		/**
		 * default items
		 * @private
		 */
		_defaultItems: {
			region: 'north',
			xtype: 'TYPO3.Taxonomy.Module.UserInterface.DocHeader',
		},
		
		/**
		 * @private
		 * @return {Array} an array items, fetched from the registry.
		 */
		_getItems: function() {
			var items, config;
			
			items = [];
			items.push(this._defaultItems);
			
			config = Registry.get('layout');
			Ext.each(config, function(item) {
				items.push(
					{
						xtype: 'TYPO3.Taxonomy.Module.Concept.ConceptView',
						region: 'center',
						border: 0,
						id: 'typo3-inner-docbody',
						layout: 'card',
						activeItem: 0
					}
				);
			}, this);
			
			return items;
		}

	});
	
	
	return TYPO3.Taxonomy.Module.UserInterface.Layout;
	
});

