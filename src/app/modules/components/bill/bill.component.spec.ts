import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent {

  @Input() orderData: any; // This will hold the order data passed from the parent
  @Input() invoiceNumber: string = '';
  @Input() date: string = '';
  @Input() time: string = '';
  
  /**
   * Calculate the total cost for a specific item.
   * @param item The item for which to calculate the total cost.
   * @returns The total cost for the item.
  */
 getItemTotal(item: any): number {
    return item.saleQty * item.item.itemPrice;
  }
  
  getTotalTopping(price: any): number {
    return price += price
  }
  
  /**
   * Calculate the total amount for the order.
   * @returns The total cost of all items in the order.
   */
  getTotal(): number {
    return this.orderData.saleItemsHelpers.reduce(
      (total: number, item: any) => total + this.getItemTotal(item),
      0
    );
  }

  @ViewChild('tableToPrint', { static: false })
  table!: ElementRef;
  
  /**
   * Print the bill. This method will trigger the browser's print functionality.
  */
  printBill(): void {
  //  window.print();

   const printWindow = window.open('', '', 'height=600,width=800');

    if (printWindow) {
      printWindow.document.write('<html><head><title>Print Table</title></head><body>');
      printWindow.document.write(this.table.nativeElement.outerHTML);  // Getting the table content
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();  // Opens the print dialog
    } else {
      console.error('Failed to open the print window.');
    }
  }
  
  
}
