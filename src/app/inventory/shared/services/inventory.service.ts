import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {InventoryItem} from '../models/inventory.model';
import {HttpClient} from '@angular/common/http';
import {InventoryReport} from '../models/inventory-report.model';

@Injectable({
    providedIn: 'root'
})
export class InventoryService {

    private inventoryList: Array<InventoryItem>;

    public inventoryListUpdate = new BehaviorSubject<Array<InventoryItem>>([]);

    public inventoryReportUpdate = new BehaviorSubject<InventoryReport>(null);

    public fetching = new BehaviorSubject<boolean>(false);

    constructor(private httpClient: HttpClient) {
    }

    public refreshData() {
        this.fetchData();
    }

    public loadInventoryList() {
        if (!this.inventoryList) {
            this.fetchData();
        }
    }

    public saveInventoryItem(item: InventoryItem) {

    }

    public updateInventoryItem(item: InventoryItem) {

    }

    public deleteInventory(item: InventoryItem) {
        const index: number = this.inventoryList.indexOf(item);

        if (index !== -1) {
            this.inventoryList.splice(index, 1);
        }

        this.dispatchListUpdate();

        this.dispatchReportUpdate();

    }

    private fetchData() {
        this.fetching.next(true);

        // Using timeout to simulate calling backend
        setTimeout(value => {
            // Create mock data
            this.inventoryList = [{
                _id: 'mongoid',
                title: 'Love Seat',
                description: 'Large screen TV',
                qty: 1,
                location: '',
                purchasePrice: 500.00,
                resalePrice: 400.00,
                images: ['data:image/jpeg;base64,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',
                    'data:image/jpeg;base64,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',
                    'data:image/jpeg;base64,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'],
                dateCreated: new Date(),
                modelNo: 'GS450',
                serialNo: '12345678',
                notes: ''
            },
                {
                    _id: 'mongoid1',
                    title: 'Kitchen Chair',
                    description: 'light colored chairs',
                    qty: 4,
                    location: '',
                    purchasePrice: 200.00,
                    resalePrice: 100.00,
                    images: ['https://www.collectorsweekly.com/uploads/2010/05/chair6.jpg'],
                    dateCreated: new Date(),
                    modelNo: 'RF667',
                    serialNo: '3453456678678',
                    notes: ''
                },
                {
                    _id: 'mongoid1',
                    title: 'Kitchen Chair',
                    description: 'light colored chairs',
                    qty: 4,
                    location: '',
                    purchasePrice: 200.00,
                    resalePrice: 100.00,
                    images: ['https://www.collectorsweekly.com/uploads/2010/05/chair6.jpg'],
                    dateCreated: new Date(),
                    modelNo: 'RF667',
                    serialNo: '3453456678678',
                    notes: ''
                },
                {
                    _id: 'mongoid1',
                    title: 'Kitchen Chair',
                    description: 'light colored chairs',
                    qty: 4,
                    location: '',
                    purchasePrice: 200.00,
                    resalePrice: 100.00,
                    images: ['https://www.collectorsweekly.com/uploads/2010/05/chair6.jpg'],
                    dateCreated: new Date(),
                    modelNo: 'RF667',
                    serialNo: '3453456678678',
                    notes: ''
                },
                {
                    _id: 'mongoid1',
                    title: 'Kitchen Chair',
                    description: 'light colored chairs',
                    qty: 4,
                    location: '',
                    purchasePrice: 200.00,
                    resalePrice: 100.00,
                    images: ['https://www.collectorsweekly.com/uploads/2010/05/chair6.jpg'],
                    dateCreated: new Date(),
                    modelNo: 'RF667',
                    serialNo: '3453456678678',
                    notes: ''
                },
                {
                    _id: 'mongoid1',
                    title: 'Kitchen Chair',
                    description: 'light colored chairs',
                    qty: 4,
                    location: '',
                    purchasePrice: 200.00,
                    resalePrice: 100.00,
                    images: ['https://www.collectorsweekly.com/uploads/2010/05/chair6.jpg'],
                    dateCreated: new Date(),
                    modelNo: 'RF667',
                    serialNo: '3453456678678',
                    notes: ''
                }];

            this.dispatchListUpdate();

            this.dispatchReportUpdate();

            this.fetching.next(false);

            console.log('loading done');

        }, 1000);
    }

    public getInventoryItem(id: string): InventoryItem {
        return {...this.inventoryList.find(item => item._id === id)};
    }

    private dispatchListUpdate() {
        this.inventoryListUpdate.next(this.inventoryList);
    }

    private dispatchReportUpdate() {
        const reportUpdate: InventoryReport = {
            totalItems: this.inventoryList.length,
            estimatedResaleValue: this.inventoryList.map(element => (element.resalePrice)).reduce((a, b) => a + b, 0),
            totalValue: this.inventoryList.map(element => (element.purchasePrice)).reduce((a, b) => a + b, 0)
        };

        this.inventoryReportUpdate.next(reportUpdate);
    }

}
