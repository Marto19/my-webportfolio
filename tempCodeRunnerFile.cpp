#include <iostream>
using namepace std;

typedef struct Element * po;

struct Element {
    int Data;
    po Next;
};

int main(){
    po q;           //kutiq q
    po p;           //kutiq p
    q=NULL;
    cout << "q: "<< q << endl;
    p= new Element;//reserve pamet
    p->Data = 78;//dostup prez p.
    p->Next = q;
    cout << "q stana ";
    cout << "p->data is" << p->Data << endl;
    cout << "p->next is" << p->Next << endl;
    q = p;      //q zapochwa da sochi tam kydeto sochi p
    cout << "q->data is" << q->Data << endl;
    cout << "q->next is" << q->Next << endl;
    p= new Element; //reserve pamet for p
    p->Data = 38;
    p->Next = q;

    cout << "novo p->data is" << p->Data << endl;
    cout << "novo p->next is" << p->Next << endl;

    q = p;
    p = p->Next ;
}