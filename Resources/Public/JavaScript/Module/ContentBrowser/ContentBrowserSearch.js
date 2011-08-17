"use strict";

Ext.ns("TYPO3.Taxonomy.Module.ContentBrowser");
	
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
define(['Taxonomy/Core/Application', 'Taxonomy/Components/SearchBar'], function(Application) {

	/**
	 * @class TYPO3.Taxonomy.Module.ContentBrowser.ContentBrowserSearch
	 * 
	 * The search element in the content browser view
	 * 
	 * @namespace TYPO3.Taxonomy.Module.ContentBrowser
	 * @extends Ext.Panel
	 */
	return Ext.define('TYPO3.Taxonomy.Module.ContentBrowser.ContentBrowserSearch', {
		
		/**
		 * The Component being extended
		 *
		 * @cfg {String}
		 */
		extend: 'Ext.form.FormPanel',
		
		/**
		 * The store 
		 *
		 * @type {Object}
		 */
		alias: 'widget.TYPO3.Taxonomy.Module.ContentBrowser.ContentBrowserSearch',

		/**
		 * Initializer
		 */
		initComponent: function() {

			// Default configuration
			var config = {
				xtype: 'form',
				border: 0,
				layout: 'hbox',
				items: [{
//					border: false,
//					xtype: 'panel',
//					layout: 'anchor',
//					items: [{
//						xtype: 'button',
//						text: 'itest'
//					}]
//				}, {
					xtype: 'TYPO3.Taxonomy.Components.SearchBar',
					flex: 1
				}]
			};
		
			Ext.apply(this, config);
			TYPO3.Taxonomy.Module.ContentBrowser.ContentBrowserSearch.superclass.initComponent.call(this);
		}
	});
});