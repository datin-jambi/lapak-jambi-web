"use client"

import { useState } from "react"
import { PageHeader } from "@/components/common/PageHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Save, ImageIcon } from "lucide-react"

const tabs = ["general", "payment", "notification", "appearance"] as const
type TabId = (typeof tabs)[number]

const tabLabels: Record<TabId, string> = {
  general: "Umum",
  payment: "Pembayaran",
  notification: "Notifikasi",
  appearance: "Tampilan",
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("general")

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pengaturan"
        description="Kelola pengaturan aplikasi"
        breadcrumbs={[{ label: "Dashboard", href: "/cms" }, { label: "Pengaturan" }]}
      />

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabId)}>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab} value={tab}>{tabLabels[tab]}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Umum</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Nama Aplikasi</Label>
                  <Input defaultValue="Lapak Jambi" />
                </div>
                <div className="space-y-2">
                  <Label>URL Website</Label>
                  <Input defaultValue="https://lapakjambi.jambiprov.go.id" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Deskripsi</Label>
                <Textarea
                  defaultValue="Platform resmi Pemerintah Provinsi Jambi untuk pengelolaan aset daerah dan pemesanan tiket wisata."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Logo</Label>
                <div className="flex items-center gap-3">
                  <div className="size-16 rounded-lg bg-zinc-100 overflow-hidden flex items-center justify-center">
                    <ImageIcon className="size-6 text-zinc-300" />
                  </div>
                  <Button variant="outline" size="sm">Upload Logo</Button>
                </div>
              </div>
              <Separator />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Email Kontak</Label>
                  <Input defaultValue="info@bpkpd.jambiprov.go.id" />
                </div>
                <div className="space-y-2">
                  <Label>Telepon</Label>
                  <Input defaultValue="(0741) 1234567" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Alamat</Label>
                <Textarea
                  defaultValue="Jl. Jenderal Gatot Subroto No. 17, Pasar Jambi, Kota Jambi"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Metode Pembayaran</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Bank Jambi", type: "Bank Transfer", active: true },
                { name: "Mandiri", type: "Bank Transfer", active: true },
                { name: "BNI", type: "Bank Transfer", active: true },
                { name: "BRI", type: "Bank Transfer", active: true },
                { name: "BTN", type: "Bank Transfer", active: true },
                { name: "GoPay", type: "E-Wallet", active: false },
                { name: "OVO", type: "E-Wallet", active: false },
                { name: "DANA", type: "E-Wallet", active: false },
              ].map((method) => (
                <div key={method.name} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-sm font-medium text-zinc-900">{method.name}</p>
                    <p className="text-xs text-zinc-500">{method.type}</p>
                  </div>
                  <Switch defaultChecked={method.active} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rekening Bank</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label>Nama Bank</Label>
                  <Input placeholder="Bank Jambi" />
                </div>
                <div className="space-y-2">
                  <Label>Nomor Rekening</Label>
                  <Input placeholder="0012345678" />
                </div>
                <div className="space-y-2">
                  <Label>Atas Nama</Label>
                  <Input placeholder="BPKPD Provinsi Jambi" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notification" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Notifikasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium text-zinc-900">Email Notifikasi</p>
                  <p className="text-xs text-zinc-500">Kirim notifikasi melalui email</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium text-zinc-900">SMS Notifikasi</p>
                  <p className="text-xs text-zinc-500">Kirim notifikasi melalui SMS</p>
                </div>
                <Switch defaultChecked={false} />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium text-zinc-900">Notifikasi Booking Baru</p>
                  <p className="text-xs text-zinc-500">Untuk admin ketika ada booking baru</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium text-zinc-900">Notifikasi Pembayaran</p>
                  <p className="text-xs text-zinc-500">Konfirmasi pembayaran berhasil</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>SMTP Server</Label>
                <Input defaultValue="smtp.gmail.com" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Email Pengirim</Label>
                  <Input defaultValue="noreply@lapakjambi.jambiprov.go.id" />
                </div>
                <div className="space-y-2">
                  <Label>SMTP Port</Label>
                  <Input defaultValue="587" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tampilan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Warna Tema</Label>
                  <div className="flex gap-2">
                    {["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"].map((color) => (
                      <button
                        key={color}
                        className="size-8 rounded-full border-2 border-transparent hover:border-zinc-300 transition-colors"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Mode Tampilan</Label>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Terang</Button>
                    <Button variant="outline" size="sm">Gelap</Button>
                    <Button variant="outline" size="sm">Sistem</Button>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Favicon</Label>
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-zinc-100 overflow-hidden flex items-center justify-center">
                    <ImageIcon className="size-5 text-zinc-300" />
                  </div>
                  <Button variant="outline" size="sm">Upload Favicon</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button>
          <Save className="size-4" />
          Simpan Pengaturan
        </Button>
      </div>
    </div>
  )
}
