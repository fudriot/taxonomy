"use strict";

Ext.ns("TYPO3.Taxonomy.Components");
	
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
define(['Taxonomy/Core/Application'], function(Application) {

	/**
	 * @class TYPO3.Taxonomy.Components.Button
	 * 
	 * An extended Ext.Button Component with clean markup, ready to be styled by CSS3.
	 * 
	 * @namespace TYPO3.Taxonomy.Components
	 * @extends Ext.Button
	 */
	Ext.define('TYPO3.Taxonomy.Components.Button', {
		
		/**
		 * The Component being extended
		 *
		 * @cfg {String}
		 */
		extend: 'Ext.Button',
		
		/**
		 * The Alias of the Component - "xtype" 
		 *
		 * @cfg {String}
		 */
		alias: 'widget.TYPO3.Taxonomy.Components.Button',

		buttonSelector: 'button span:first-child',
		menuClassTarget: 'button span',

		template: new Ext.Template(
			'<div id="{2}" class="TYPO3-TYPO3-Components-Button"><button type="{0}" class="{1}"><span></span></button></div>'
		).compile(),

		getTemplateArgs: function() {
			return [this.type, this.cls + ' TYPO3-TYPO3-Components-Button-scale-' + this.scale, this.id];
		}
	});
});

