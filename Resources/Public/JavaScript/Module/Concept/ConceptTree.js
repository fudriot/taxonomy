"use strict";

Ext.ns("TYPO3.Taxonomy.Module.Concept");
	
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
	 * @class TYPO3.Taxonomy.Module.Concept.Tree
	 * 
	 * The tree of Concepts
	 * 
	 * @namespace TYPO3.Taxonomy.Module.Concept
	 * @extends Ext.tree.TreePanel
	 */
	TYPO3.Taxonomy.Module.Concept.Tree = Ext.define('TYPO3.Taxonomy.Module.Concept.Tree', {

		/**
		 * The Component being extended
		 *
		 * @cfg {String}
		 */
		extend: 'Ext.tree.Panel',
		
		/**
		 * The Alias of the Component - "xtype" 
		 *
		 * @cfg {String}
		 */
		alias: 'widget.TYPO3.Taxonomy.Module.Concept.Tree',
		
//		/**
//		 * Tree Editor Instance (Inline Edit)
//		 *
//		 * @type {TYPO3.Components.PageTree.TreeEditor}
//		 */
//		treeEditor: null,
//
//		/**
//		 * Indicates if the label should be editable
//		 *
//		 * @cfg {Boolean}
//		 */
//		labelEdit: true,
//
//		/**
//		 * Enable the drag and drop feature
//		 *
//		 * @cfg {Boolean}
//		 */
//		enableDD: true,
//
//		/**
//		 * Drag and Drop Group
//		 *
//		 * @cfg {String}
//		 */
//		ddGroup: 'typo3-pagetree',
//
//		/**
//		 * Id of the deletion drop zone if any
//		 *
//		 * @cfg {String}
//		 */
//		deletionDropZoneId: '',
//
//		/**
//		 * Root Node Configuration
//		 *
//		 * @type {Object}
//		 */
//		rootNodeConfig: {
//			id: 'root',
//			expanded: true,
//			nodeData: {
//				id: 'root'
//			}
//		},
//
//		/**
//		 * Indicator if the control key is pressed
//		 *
//		 * @type {Boolean}
//		 */
//		isControlPressed: false,
//
//		/**
//		 * Context Node
//		 *
//		 * @type {Ext.tree.TreeNode}
//		 */
//		t3ContextNode: null,
//
//		/**
//		 * Context Information
//		 *
//		 * @type {Object}
//		 */
//		t3ContextInfo: {
//			inCopyMode: false,
//			inCutMode: false
//		},
//
		/**
		 * Registered clicks for the double click feature
		 *
		 * @type {int}
		 */
		clicksRegistered: 0,
//
//		/**
//		 * Indicator if the control key was pressed
//		 *
//		 * @type {Boolean}
//		 */
//		controlKeyPressed: false,


		/**
		 * Initializes the component
		 *
		 * @return {void}
		 */
		initComponent: function() {

			var config = {
				
				store: Ext.create('Ext.data.TreeStore', {
					proxy: {
						type: 'direct',
						directFn: TYPO3.Taxonomy.Service.ExtDirect.Controller.ConceptController.getNextTreeLevel
					}
				}),
				border: false,
	//			id: 'tree-panel',
				id: 'typo3-pagetree-tree',
				split: true,
				height: 300,
				minSize: 150,
				autoScroll: true,

//				plugins: new TYPO3.Taxonomy.Plugins.StateTreePanel(),
				useArrows: true,
				viewConfig: {
					plugins: {
						ptype: 'treeviewdragdrop',
					},
					listeners: {
						drop: function(node, data, model, pos, drop) {
						}
					}
				},
				// tree-specific configs:
				rootVisible: true,
				
				tbar: [{
					xtype: 'button',
					text: 'asdf',
					//iconCls: 'TYPO3-TYPO3-Management-Tree'
				}],

				root: {
//					nodeType: 'async',
					id: 'root',
					text: 'Topics',
					expanded: true,
					nodeData: {
						id: 'root'
					}
				}
			};
			
			
			// Listeners:
			// Event handlers that handle click events and synchronizes the label edit,
			this.on(
				'itemclick',
				this.onItemClick,
				this,
				{delay: 400}
			);
			
			this.on(
				'itemdblclick',
				this.onItemDblClick,
				this
			);
				
			Ext.apply(this, config);
			TYPO3.Taxonomy.Module.Concept.Tree.superclass.initComponent.call(this);
			//TYPO3.Taxonomy.Application.fireEvent('TYPO3.Taxonomy.Module.ConceptTree.afterInit', this);
		},

//		/**
//		 * prevent the expanding / collapsing on double click
//		 *
//		 * @return void
//		 */
//		beforedblclick: function(node, event) {
//			return false;
//		},


		/**
		 * Action when leaf is double clicked
		 *
		 * @param {Ext.view.View} this
		 * @param {Ext.data.Model} record The record that belongs to the item
		 * @param {HTMLElement} item The item's element
		 * @param {Number} index The item's index
		 * @param {Ext.EventObject} e The raw event object
		 */
		onItemDblClick: function(view, model, htmlElement, number, event) {
			this.clicksRegistered = 2;
		},
				
		 /**
		 * Action when leaf is clicked
		 *
		 * single click handler that only triggers after a delay to let the double click event
		 * a possibility to be executed (needed for label edit)
		 * 
		 * @param {Ext.view.View} this
		 * @param {Ext.data.Model} record The record that belongs to the item
		 * @param {HTMLElement} item The item's element
		 * @param {Number} index The item's index
		 * @param {Ext.EventObject} e The raw event object
		 */
		onItemClick: function(view, model, htmlElement, number, event) {

			// @todo find a way to detect a double click => leaf get edited
//			if (this.clicksRegistered === 2) {
//				event.stopEvent();
//				return false;
//			}
			
			TYPO3.Taxonomy.Service.ExtDirect.Controller.ConceptController.edit(model.get('id'), function(result) {
				Ext.getCmp('TYPO3.Taxonomy.Module.Concept.ConceptContent').update(result);
			});

//			if (this.stateHash) {
//				this.stateHash.lastSelectedNode = node.id;
//			}
//
//			// Action when user click on a node
//			TYPO3.Taxonomy.ExtDirect.getRecordType('root', 'root', function(response, options) {
//
//				var items = new Array();
//				for (var i = 0; i < response.length; i++) {
//					var recordType = response[i];
//					var grid = new TYPO3.Taxonomy.Module.Concept.GridPanel({
//						recordType: recordType,
//						nodeId: node.id
//					});
//
//					items.push(grid);
//				}
//
//				var layout = new Ext.Container ({
//					id: 'absolute-panel' + node.id,
//					items: items
//				});
//
//				TYPO3.Taxonomy.UserInterface.doc.content.add(layout);
//				TYPO3.Taxonomy.UserInterface.doc.content.layout.setActiveItem('absolute-panel' + node.id);
//
//			});


	//		if (this.commandProvider.singleClick) {
	//			this.commandProvider.singleClick(node, this);
	//		}
		},

//		/**
//		 * Triggers the editing of the node if the tree editor is available
//		 *
//		 * @param {Ext.tree.TreeNode} node
//		 * @return {void}
//		 */
//		triggerEdit: function(node) {
//			if (this.treeEditor) {
//				this.treeEditor.triggerEdit(node);
//			}
//		},
//
//		/**
//		 * Enables the drag and drop feature
//		 *
//		 * return {void}
//		 */
//		enableDragAndDrop: function() {
//				// init proxy element
//			this.on('startdrag', this.initDd, this);
//			this.on('enddrag', this.stopDd, this);
//				// node is moved
//			this.on('movenode', this.moveNode, this);
//
//				// new node is created/copied
//			this.on('beforenodedrop', this.beforeDropNode, this);
//			this.on('nodedrop', this.dropNode, this);
//
//				// listens on the ctrl key to toggle the copy mode
//			(new Ext.KeyMap(document, {
//				key: Ext.EventObject.CONTROL,
//				scope: this,
//				buffer: 250,
//				fn: function() {
//					if (!this.controlKeyPressed && this.dragZone.dragging && this.copyHint) {
//						if (this.shouldCopyNode) {
//							this.copyHint.show();
//						} else {
//							this.copyHint.hide();
//						}
//
//						this.shouldCopyNode = !this.shouldCopyNode;
//						this.dragZone.proxy.el.toggleClass('typo3-pagetree-copy');
//					}
//					this.controlKeyPressed = true;
//				}
//			}, 'keydown'));
//
//			(new Ext.KeyMap(document, {
//				key: Ext.EventObject.CONTROL,
//				scope: this,
//				fn: function() {
//					this.controlKeyPressed = false;
//				}
//			}, 'keyup'));
//
//				// listens on the escape key to stop the dragging
//			(new Ext.KeyMap(document, {
//				key: Ext.EventObject.ESC,
//				scope: this,
//				buffer: 250,
//				fn: function(event) {
//					if (this.dragZone.dragging) {
//						Ext.dd.DragDropMgr.stopDrag(event);
//						this.dragZone.onInvalidDrop(event);
//					}
//				}
//			}, 'keydown'));
//		},
//
//		/**
//		 * Disables the deletion drop zone if configured
//		 *
//		 * @return {void}
//		 */
//		stopDd: function() {
//			if (this.deletionDropZoneId) {
//				Ext.getCmp(this.deletionDropZoneId).hide();
//				this.app.doLayout();
//			}
//		},
//
//		/**
//		 * Enables the deletion drop zone if configured. Also it creates the
//		 * shown dd proxy element.
//		 *
//		 * @param {TYPO3.Components.PageTree.Tree} treePanel
//		 * @param {Ext.tree.TreeNode} node
//		 * @return {void}
//		 */
//		initDd: function(treePanel, node) {
//			var nodeHasChildNodes = (node.hasChildNodes() || node.isExpandable());
//			if (this.deletionDropZoneId &&
//				(!nodeHasChildNodes ||
//				(nodeHasChildNodes && TYPO3.Components.PageTree.Configuration.canDeleteRecursivly)
//			)) {
//				Ext.getCmp(this.deletionDropZoneId).show();
//				this.app.doLayout();
//			}
//			this.initDDProxyElement();
//		},
//
//		/**
//		 * Adds the copy hint to the proxy element
//		 *
//		 * @return {void}
//		 */
//		initDDProxyElement: function() {
//			this.shouldCopyNode = false;
//			this.copyHint = new Ext.Element(document.createElement('div')).addClass(this.id + '-copy');
//			this.copyHint.dom.appendChild(document.createTextNode(TYPO3.Taxonomy.Language.copyHint));
//			this.copyHint.setVisibilityMode(Ext.Element.DISPLAY);
//			this.dragZone.proxy.el.shadow = false;
//			this.dragZone.proxy.ghost.dom.appendChild(this.copyHint.dom);
//		},
//
//		/**
//		 * Creates a Fake Node
//		 *
//		 * This must be done to prevent the calling of the moveNode event.
//		 *
//		 * @param {object} dragElement
//		 */
//		beforeDropNode: function(dragElement) {
//			if (dragElement.data && dragElement.data.item && dragElement.data.item.shouldCreateNewNode) {
//				this.t3ContextInfo.serverNodeType = dragElement.data.item.nodeType;
//				dragElement.dropNode = new Ext.tree.TreeNode({
//					text: TYPO3.Taxonomy.Language.fakeNodeHint,
//					leaf: true,
//					isInsertedNode: true
//				});
//
//					// fix incorrect cancel value
//				dragElement.cancel = false;
//
//			} else if (this.shouldCopyNode) {
//				dragElement.dropNode.ui.onOut();
//				var attributes = dragElement.dropNode.attributes;
//				attributes.isCopiedNode = true;
//				attributes.id = 'fakeNode';
//				dragElement.dropNode = new Ext.tree.TreeNode(attributes);
//			}
//
//			return true;
//		},
//
//		/**
//		 * Differentiate between the copy and insert event
//		 *
//		 * @param {Ext.tree.TreeDropZone} dragElement
//		 * return {void}
//		 */
//		dropNode: function(dragElement) {
//			this.controlKeyPressed = false;
//			if (dragElement.dropNode.attributes.isInsertedNode) {
//				dragElement.dropNode.attributes.isInsertedNode = false;
//				this.insertNode(dragElement.dropNode);
//			} else if (dragElement.dropNode.attributes.isCopiedNode) {
//				dragElement.dropNode.attributes.isCopiedNode = false;
//				this.copyNode(dragElement.dropNode)
//			}
//		},
//
//		/**
//		 * Moves a node
//		 *
//		 * @param {TYPO3.Components.PageTree.Tree} tree
//		 * @param {Ext.tree.TreeNode} movedNode
//		 * @param {Ext.tree.TreeNode} oldParent
//		 * @param {Ext.tree.TreeNode} newParent
//		 * @param {int} position
//		 * return {void}
//		 */
//		moveNode: function(tree, movedNode, oldParent, newParent, position) {
//			this.controlKeyPressed = false;
//			tree.t3ContextNode = movedNode;
//			if (position === 0) {
//				console.log('@todo moveNodeToFirstChildOfDestination');
//				//this.commandProvider.moveNodeToFirstChildOfDestination(newParent, tree);
//			} else {
//				var previousSiblingNode = newParent.childNodes[position - 1];
//				console.log('@todo moveNodeAfterDestination');
//				//this.commandProvider.moveNodeAfterDestination(previousSiblingNode, tree);
//			}
//		},
//
//		/**
//		 * Inserts a node
//		 *
//		 * @param {Ext.tree.TreeNode} movedNode
//		 * return {void}
//		 */
//		insertNode: function(movedNode) {
//			this.t3ContextNode = movedNode.parentNode;
//
//			movedNode.disable();
//			if (movedNode.previousSibling) {
//				console.log('@todo insertNodeAfterDestination');
//	//			this.commandProvider.insertNodeAfterDestination(movedNode, this);
//			} else {
//				//console.log(movedNode);
//				this.insertNodeToFirstChildOfDestination(movedNode, this);
//			}
//		},
//
//
//		/**
//		 * @stolen from action.js
//		 * 
//		 * Inserts a new node as the first child of the given node
//		 *
//		 * @param {Ext.tree.TreeNode} node
//		 * @param {TYPO3.Components.PageTree.Tree} tree
//		 * @return {void}
//		 */
//		insertNodeToFirstChildOfDestination: function(node, tree) {
//			TYPO3.Taxonomy.ExtDirect.insertNodeToFirstChildOfDestination (
//				tree.t3ContextNode.attributes.nodeData,
//				tree.t3ContextInfo.serverNodeType,
//				function(response) {
//					if (this.evaluateResponse(response)) {
//						this.updateNode(node, true, response, function(node) {
//							tree.triggerEdit(node);
//						});
//					}
//	//				this.releaseCutAndCopyModes(tree);
//				},
//				this
//			);
//		},
//
//		/**
//		 * @stolen from action.js
//		 * 
//		 * Evaluates a response from an ext direct call and shows a flash message
//		 * if it was an exceptional result
//		 *
//		 * @param {Object} response
//		 * @return {Boolean}
//		 */
//		evaluateResponse: function(response) {
//			if (response.success === false) {
//				TYPO3.Flashmessage.display(4, 'Exception', response.message);
//				return false;
//			}
//
//			return true;
//		},
//
//		/**
//		 * @stolen from action.js
//		 * 
//		 * Updates an existing node with the given alternative. The new tree node
//		 * is returned afterwards.
//		 *
//		 * @param {Ext.tree.TreeNode} node
//		 * @param {Boolean} isExpanded
//		 * @param {Object} updatedNode
//		 * @param {Function} callback
//		 * @return {Ext.tree.TreeNode}
//		 */
//		updateNode: function(node, isExpanded, updatedNode, callback) {
//			if (!updatedNode) {
//				return null;
//			}
//
//			updatedNode.uiProvider = node.ownerTree.uiProvider;
//			var newTreeNode = new Ext.tree.TreeNode(updatedNode);
//
//			var refreshCallback = this.restoreNodeStateAfterRefresh;
//
//			if (callback) {
//				refreshCallback = refreshCallback.createSequence(callback);
//			}
//
//			node.parentNode.replaceChild(newTreeNode, node);
//			newTreeNode.ownerTree.refreshNode(newTreeNode, refreshCallback);
//
//			return newTreeNode;
//		},
//
//
//
//		/**
//		 * @stolen from action.js
//		 * 
//		 * Restores the node state
//		 *
//		 * @param {Ext.tree.TreeNode} node
//		 * @param {Boolean} isExpanded
//		 * @return {void}
//		 */
//		restoreNodeStateAfterRefresh: function(node, isExpanded) {
//			node.parentNode.expand(false, false);
//			if (isExpanded) {
//				node.expand(false, false);
//			} else {
//				node.collapse(false, false);
//			}
//		},
//
//		/**
//		 * Refreshes the tree
//		 *
//		 * @param {Function} callback
//		 * @param {Object} scope
//		 * return {void}
//		 */
//		refreshTree: function(callback, scope) {
//				// remove readable rootline elements while refreshing
//			if (!this.inRefreshingMode) {
//				var rootlineElements = Ext.select('.x-tree-node-readableRootline');
//				if (rootlineElements) {
//					rootlineElements.each(function(element) {
//						element.remove();
//					});
//				}
//			}
//
//			this.refreshNode(this.root, callback, scope);
//		},
//
//		/**
//		 * Refreshes a given node
//		 *
//		 * @param {Ext.tree.TreeNode} node
//		 * @param {Function} callback
//		 * @param {Object} scope
//		 * return {void}
//		 */
//		refreshNode: function(node, callback, scope) {
//			if (this.inRefreshingMode) {
//				return;
//			}
//
//			scope = scope || node;
//			this.inRefreshingMode = true;
//			var loadCallback = function(node) {
//				node.ownerTree.inRefreshingMode = false;
//				if (node.ownerTree.restoreState) {
//					node.ownerTree.restoreState(node.getPath());
//				}
//			};
//
//			if (callback) {
//				loadCallback = callback.createSequence(loadCallback);
//			}
//
//			this.getLoader().load(node, loadCallback, scope);
//		},
//
//		/**
//		 * Copies a node
//		 *
//		 * @param {Ext.tree.TreeNode} movedNode
//		 * return {void}
//		 */
//		copyNode: function(movedNode) {
//			this.t3ContextNode = movedNode;
//
//			movedNode.disable();
//			if (movedNode.previousSibling) {
//				console.log('@todo copyNodeAfterDestination');
//				//this.commandProvider.copyNodeAfterDestination(movedNode, this);
//			} else {
//				console.log('@todo copyNodeToFirstChildOfDestination');
//				//this.commandProvider.copyNodeToFirstChildOfDestination(movedNode, this);
//			}
//		}
	});
});
