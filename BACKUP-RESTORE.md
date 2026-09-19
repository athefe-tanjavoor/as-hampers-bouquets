# Database Backup, Disaster Recovery & Restore Procedures

This document outlines the backup policy, point-in-time recovery processes, and data redundancy strategies for **Bloom & Blossom**.

---

## 1. Backup Strategy Overview

| Tier | Method | Frequency | Retention Period | Storage Location |
| :--- | :--- | :--- | :--- | :--- |
| **Continuous** | MongoDB Atlas Oplog Continuous Archiving | Real-time | 7 days | Multi-region cloud storage |
| **Daily Snapshots** | Automated Atlas Cloud Backups | Every 24 hours (02:00 IST) | 30 days | Secondary cloud region |
| **Weekly Offline Archive**| Compressed `mongodump` archive | Every Sunday | 90 days | Encrypted AWS S3 / Cold Storage |

---

## 2. Point-in-Time Recovery (PITR) via MongoDB Atlas

In the event of accidental data modification, catastrophic administrative error, or data corruption:
1. Open the [MongoDB Atlas Console](https://cloud.mongodb.com).
2. Select the target database cluster.
3. Navigate to **Backup** > **Point-in-Time Restore**.
4. Select the precise restore target timestamp (e.g. `2026-09-19 14:00:00 UTC` - 5 minutes prior to the incident).
5. Choose whether to restore into a **New Cluster** (safest approach to inspect and extract specific collections) or directly overwrite the existing cluster.

---

## 3. Manual Backup Commands (`mongodump`)

For local development backups, staging exports, or pre-migration snapshots:

### 3.1 Full Database Export
```bash
# Export compressed archive with oplog for point-in-time consistency
mongodump \
  --uri="mongodb+srv://user:password@cluster.mongodb.net/bloom_db" \
  --archive="bloom_db_backup_$(date +%Y%m%d_%H%M%S).gz" \
  --gzip \
  --oplog
```

### 3.2 Selective Collection Backup
To export high-value financial collections only (`orders`, `payments`, `users`):
```bash
mongodump --uri="$MONGODB_URI" --collection=orders --out=./backup/
mongodump --uri="$MONGODB_URI" --collection=payments --out=./backup/
mongodump --uri="$MONGODB_URI" --collection=users --out=./backup/
```

---

## 4. Restore Procedures (`mongorestore`)

### 4.1 Restoring Full Compressed Archive
```bash
mongorestore \
  --uri="mongodb+srv://user:password@target-cluster.mongodb.net/bloom_db" \
  --archive="bloom_db_backup_20260919.gz" \
  --gzip \
  --drop
```
> [!WARNING]
> The `--drop` flag will delete existing collections before restoring. Never execute `--drop` against a production cluster without strict written authorization and an active snapshot.

### 4.2 Restoring to Local Development Environment
```bash
mongorestore --db bloom_db --drop ./backup/bloom_db/
```

---

## 5. Recovery Time Objective (RTO) & Recovery Point Objective (RPO)

- **RTO (Recovery Time Objective)**: < 30 minutes to provision and point traffic to a restored replica cluster.
- **RPO (Recovery Point Objective)**: < 5 minutes of transaction data loss utilizing continuous oplog replay.
