/* eslint-disable @typescript-eslint/no-explicit-any */
// app/admin/components/CustomersContent.tsx
'use client';

import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Button } from '@/components/ui/button';
import { SendSmsModal } from './SendSmsModal'; // adjust path if needed
import { ChevronDown, Download, Package } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SendBulkSmsModal } from './SendBulkSmsModal';

interface Address {
  id: string;
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  coordinates: any; // or Json
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  company: string | null;
  // Keep existing fields
  addresses: Address[]; // all addresses
  totalShipments: number;
  lastShipmentDate: Date | null;
  originCountries: string[];
  deliveryCountries: string[];
  // ✅ Add these for pre-fill
  defaultPickupAddress: Address | null;    // from pickupContacts[0]?.customPickupAddress
  defaultDeliveryAddress: Address | null;  // from deliveryContacts[0]?.customDeliveryAddress
}

function formatAddressShort(addr: Address | null) {
  if (!addr) return '—';
  return `${addr.city}, ${addr.country}`;
}
export default function CustomersContent() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState('all');
  const [isBulkSmsOpen, setIsBulkSmsOpen] = useState(false);
  const [activityFilter, setActivityFilter] = useState('all');

  const uniqueCountries = Array.from(
    new Set(customers.flatMap(c => c.deliveryCountries))
  ).filter(country => country != null && country.trim() !== '');

  const filtered = customers.filter(customer => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.email?.includes(searchTerm);

    const matchesCountry =
      countryFilter === 'all' ||
      customer.deliveryCountries.includes(countryFilter);

    let matchesActivity = true;
    if (activityFilter === 'active') {
      matchesActivity =
        customer.lastShipmentDate != null &&
        new Date(customer.lastShipmentDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    } else if (activityFilter === 'inactive') {
      matchesActivity =
        !customer.lastShipmentDate ||
        new Date(customer.lastShipmentDate) <= new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
    }

    return matchesSearch && matchesCountry && matchesActivity;
  });
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch('/api/admin/customers'); // ← You'll create this API
        if (!res.ok) throw new Error('Failed to fetch');
        const rawCustomers = await res.json();

        // Clean data like you did before
        const cleaned = rawCustomers.map((c: any) => ({
          ...c,
          originCountries: c.originCountries?.filter((country: any) => country != null) || [],
          deliveryCountries: c.deliveryCountries?.filter((country: any) => country != null) || [],
        }));

        setCustomers(cleaned);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) return <div className="p-6">Loading customers...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  const exportToCSV = () => {
    const headers = ['Name', 'Phone', 'Email', 'Company', 'Shipments', 'Last Activity'];
    const rows = customers.map(c => [
      `"${c.name}"`,
      c.phone,
      c.email || '',
      c.company || '',
      c.totalShipments,
      c.lastShipmentDate ? new Date(c.lastShipmentDate).toLocaleDateString() : ''
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customers.csv';
    a.click();
  };

  return (
    <div className="container mx-auto py-4 px-2 sm:px-4">
      <Card>
        <CardHeader className="space-y-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Package className="w-5 h-5" />
            Customers Directory
          </CardTitle>

          {/* Responsive Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              placeholder="Search by name, phone, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {uniqueCountries.map(country => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={activityFilter} onValueChange={setActivityFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Activity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active (≤30d)</SelectItem>
                <SelectItem value="inactive">Inactive (≥90d)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={exportToCSV} className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export CSV</span>
              <span className="sm:hidden">CSV</span>
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsBulkSmsOpen(true)} className="flex items-center gap-1">
              📩 <span className="sm:hidden">Bulk SMS</span>
              <span className="hidden sm:inline">Send Bulk SMS</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {customers.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No customers found.</p>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <div className="min-w-full md:min-w-[800px] lg:min-w-[1000px]">
                  <Table className="table-fixed">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-1/4">Customer</TableHead>
                        <TableHead className="w-1/6">Phone</TableHead>
                        <TableHead className="w-1/5">Primary Address</TableHead>
                        <TableHead className="w-16">Shipments</TableHead>
                        <TableHead className="w-1/6">Activity</TableHead>
                        <TableHead className="w-32">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtered.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell className="font-medium">
                            <div className="truncate">{customer.name}</div>
                            {customer.email && (
                              <div className="text-sm text-gray-500 truncate">{customer.email}</div>
                            )}
                            {customer.company && (
                              <div className="text-sm text-gray-500 truncate">({customer.company})</div>
                            )}
                          </TableCell>
                          <TableCell className="font-mono truncate">{customer.phone}</TableCell>
                          <TableCell>
                            {customer.addresses.length > 0 ? (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span className="cursor-pointer text-sm truncate block max-w-[180px]">
                                      {formatAddressShort(customer.defaultDeliveryAddress)}
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <div className="max-h-48 overflow-y-auto">
                                      {customer.addresses.map((addr, i) => (
                                        <div key={i} className="mb-2 last:mb-0">
                                          <div>{addr.line1}</div>
                                          {addr.line2 && <div>{addr.line2}</div>}
                                          <div className="text-xs text-gray-500">
                                            {addr.city}, {addr.state} {addr.postalCode}, {addr.country}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            ) : (
                              <span>—</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {customer.totalShipments} shipment
                            {customer.totalShipments !== 1 ? 's' : ''}
                          </TableCell>
                          <TableCell>
                            {customer.lastShipmentDate ? (
                              <>
                                <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded">
                                  DELIVERED
                                </span>
                                <div className="text-xs text-gray-500 mt-1 truncate">
                                  {formatDistanceToNow(new Date(customer.lastShipmentDate))} ago
                                </div>
                              </>
                            ) : (
                              <span className="text-gray-400">—</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1 flex-wrap">
                              <SendSmsButton customer={customer} />
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline" size="sm" className="whitespace-nowrap">
                                    New Parcel <ChevronDown className="w-3 h-3 ml-1" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => {
                                      localStorage.setItem('prefillParcelData', JSON.stringify({
                                        role: 'recipient',
                                        customer: {
                                          name: customer.name,
                                          phone: customer.phone,
                                          email: customer.email,
                                          address: customer.defaultDeliveryAddress,
                                        }
                                      }));
                                      window.location.href = '/newParcel';
                                    }}
                                  >
                                    As Recipient
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      localStorage.setItem('prefillParcelData', JSON.stringify({
                                        role: 'sender',
                                        customer: {
                                          name: customer.name,
                                          phone: customer.phone,
                                          email: customer.email,
                                          address: customer.defaultPickupAddress,
                                        }
                                      }));
                                      window.location.href = '/newParcel';
                                    }}
                                  >
                                    As Sender
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Mobile View: Stacked Cards */}
              <div className="md:hidden space-y-4">
                {filtered.map((customer) => (
                  <div key={customer.id} className="border rounded-lg p-4 shadow-sm">
                    <div className="font-semibold">{customer.name}</div>
                    {customer.email && <div className="text-sm text-gray-600">{customer.email}</div>}
                    {customer.company && <div className="text-sm text-gray-600">({customer.company})</div>}
                    <div className="mt-2 text-sm">
                      <span className="font-medium">Phone:</span> {customer.phone}
                    </div>
                    <div className="mt-1 text-sm">
                      <span className="font-medium">Address:</span> {formatAddressShort(customer.defaultDeliveryAddress)}
                    </div>
                    <div className="mt-1 text-sm">
                      <span className="font-medium">Shipments:</span> {customer.totalShipments}
                    </div>
                    <div className="mt-1 text-sm">
                      <span className="font-medium">Last Activity:</span>{' '}
                      {customer.lastShipmentDate ? (
                        <span>
                          DELIVERED — {formatDistanceToNow(new Date(customer.lastShipmentDate))} ago
                        </span>
                      ) : (
                        '—'
                      )}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <SendSmsButton customer={customer} />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                            New Parcel
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => {
                              localStorage.setItem('prefillParcelData', JSON.stringify({
                                role: 'recipient',
                                customer: { name: customer.name, phone: customer.phone, email: customer.email, address: customer.defaultDeliveryAddress }
                              }));
                              window.location.href = '/newParcel';
                            }}
                          >
                            As Recipient
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              localStorage.setItem('prefillParcelData', JSON.stringify({
                                role: 'sender',
                                customer: { name: customer.name, phone: customer.phone, email: customer.email, address: customer.defaultPickupAddress }
                              }));
                              window.location.href = '/newParcel';
                            }}
                          >
                            As Sender
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {isBulkSmsOpen && (
        <SendBulkSmsModal
          isOpen={isBulkSmsOpen}
          onClose={() => setIsBulkSmsOpen(false)}
          recipients={filtered.map(c => ({ name: c.name, phone: c.phone }))}
          onSend={async (phone, message) => {
            const response = await fetch('/api/admin/sms/send', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ to: phone, message }),
            });
            if (!response.ok) {
              const error = await response.json();
              throw new Error(error.message || 'SMS send failed');
            }
          }}
        />
      )}
    </div>
  );
}

// Keep SendSmsButton here (Client Component)
function SendSmsButton({ customer }: { customer: Customer }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSendSms = async (phone: string, message: string) => {
    const response = await fetch('/api/admin/sms/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: phone, message }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'SMS send failed');
    }
  };

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        onClick={() => setIsOpen(true)}
      >
        Send SMS
      </Button>
      <SendSmsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        recipientName={customer.name}
        recipientPhone={customer.phone}
        onSend={handleSendSms}
      />
    </>
  );
}