import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [


  {
    label: '',
    main: [
      {
        state: 'forms',
        short_label: 'P',
        main_state: 'forms',
        name: 'Master',
        type: 'sub',
        icon: 'ti-pencil-alt',
        children: [
          {
            state: 'item',
            name: 'Add Service',
          },
          {
            state: 'party',
            name: 'Add Doctor'
          },
         
        ],
        badge: [
          {
            type: 'warning',
            value: 'New'
          }
        ]
      },
      {
        state: 'forms',
        main_state: 'forms',
        name: 'Browser',
        type: 'sub',
        icon: 'ti-pencil-alt',
        children: [
          {
            state: 'itemreport',
            name: 'Service List',
          },
          {
            state: 'partyreport',
            name: 'Doctor List'
          },
        ]
       
      },
      // {
      //   state: 'forms',
      //   main_state: 'forms',
      //   name: 'Purchase',
      //   type: 'sub',
      //   icon: 'ti-pencil-alt',
      //   children: [
      //     {
      //       state: 'purchase',
      //       name: 'Purchase Entry',
      //     }, {
      //       state: 'purchasereport',
      //       name: 'Purchase Browser'
      //     }
      //   ]
       
      // },
      {
        state: 'saleorder',
        short_label: 'FW',
        main_state: '',
        name: 'Opd Recipt ',
        type: 'link',
        icon: 'ti-crown'
      },{
        state: 'salebrowser',
        short_label: 'FW',
        main_state: '',
        name: 'Opd List',
        type: 'link',
        icon: 'ti-crown'
      },
      {
        state: 'salechallan',
        short_label: 'FW',
        main_state: '',
        name: 'Ipd Recipt  ',
        type: 'link',
        icon: 'ti-crown'
      },{
        state: 'schallanbrowser',
        short_label: 'FW',
        main_state: '',
        name: 'Ipd List',
        type: 'link',
        icon: 'ti-crown'
      },
      {
        state: 'labentry',
        short_label: 'FW',
        main_state: '',
        name: 'Lab Entry',
        type: 'link',
        icon: 'ti-crown'
      },
      {
        state: 'labbrowser',
        short_label: 'FW',
        main_state: '',
        name: 'Lab Browser',
        type: 'link',
        icon: 'ti-crown'
      },
  //     {
  //       state: 'purchasechaalan',
  //       short_label: 'FW',
  //       main_state: '',
  //       name: 'Purchase Order',
  //       type: 'link',
  //       icon: 'ti-crown'
  //     },
  //     {
  //       state: 'purchasechaalanbrowser',
  //       short_label: 'FW',
  //       main_state: '',
  //       name: 'Purchase Order Browser',
  //       type: 'link',
  //       icon: 'ti-crown'
  //     },
  
      {
        state: 'taxreport',
        short_label: 'FW',
        main_state: 'reports',
        name: 'Opd Report',
        type: 'link',
        icon: 'ti-crown'
      },
      {
        state: 'stockreport',
        short_label: 'FW',
        main_state: 'reports',
        name: 'Ipd Report',
        type: 'link',
        icon: 'ti-crown'
      },
      {
        state: 'stockvaluereport',
        short_label: 'FW',
        main_state: 'reports',
        name: 'Stock Report',
        type: 'link',
        icon: 'ti-crown'
      },
      {
        state: 'list',
        short_label: 'FW',
        main_state: '',
        name: 'List',
        type: 'link',
        icon: 'ti-crown'
      },
      {
        state: 'listbrowser',
        short_label: 'FW',
        main_state: '',
        name: 'List Browser',
        type: 'link',
        icon: 'ti-crown'
      },


  //     {
  //       state: 'stockvaluereport',
  //       short_label: 'FW',
  //       main_state: 'reports',
  //       name: 'Stock value Report',
  //       type: 'link',
  //       icon: 'ti-crown'
  //     },
  //     {
  //       state: 'accountledger',
  //       short_label: 'FW',
  //       main_state: 'forms',
  //       name: 'Account Ledger',
  //       type: 'link',
  //       icon: 'ti-crown'
  //     },
  //     {
  //       state: 'ledgerbrowser',
  //       short_label: 'FW',
  //       main_state: '',
  //       name: 'Ledger Browser',
  //       type: 'link',
  //       icon: 'ti-crown'
  //     },

    ]
  }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
}
